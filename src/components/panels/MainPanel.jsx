import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import SettingsPanel from "../panels/SettingsPanel";
import { intervalToDuration } from "date-fns";
import useMqtt from "../../hooks/hook";
import { useEffect } from "react";
import {
  setConnection,
  setMessageSend,
  addAlarmLogs,
  tags,
} from "../../slices/stateSlice";

const MainPanel = () => {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.stateSlice);

  const { connectionStatus, setTag, resetAlarm } = useMqtt(
    "ws://localhost:9001"
  );

  const sendEmail = useCallback((location) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    today = dd + "/" + mm + "/" + yyyy;

    var templateParams = {
      alert_location: location,
      alert_time: time,
      alert_date: today,
    };

    emailjs
      .send(
        "service_dgso4uc",
        "template_3d1x4pr",
        templateParams,
        "C7ASYg3zD9tIvtK1w"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }, []);

  useEffect(() => {
    dispatch(setConnection(connectionStatus));

    if (machineState.messageSend) {
      resetAlarm();
      dispatch(setMessageSend(false));
    }
  }, [
    connectionStatus,
    dispatch,
    machineState.messageSend,
    resetAlarm,
    setTag,
  ]);

  const logAlarmData = useCallback(
    (location) => {
      const items = JSON.parse(localStorage.getItem("alarmLog"));

      if (items == null) {
        const newList = [
          {
            id: "1",
            location: location,
            timeStamp: new Date(),
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
          },
        ];
        localStorage.setItem("alarmLog", JSON.stringify(newList));
        dispatch(addAlarmLogs(newList));
        return;
      }

      const newArray = [];

      items.forEach((item) => {
        const dur = intervalToDuration({
          start: new Date(),
          end: new Date(item.timeStamp),
        });
        if (dur.days >= 30 || dur.months > 0) {
          return;
        }
        newArray.push(item);
      });

      const newList = [
        {
          id: items.length + 1,
          location: location,
          timeStamp: new Date(),
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        },
        ...items,
      ];

      localStorage.setItem("alarmLog", JSON.stringify(newList));
      dispatch(addAlarmLogs(newList));
    },
    [dispatch]
  );

  function getName(key) {
    switch (key) {
      case "EMPB0":
        return "Foyer";
      case "EMPB1":
        return "Factory Entrance";
      case "EMPB2":
        return "Main Workshop Boxspann De-coiler Roller Door";
      case "EMPB3":
        return "Main Workshop Strapper Roller Door";
      case "EMPB4":
        return "PCT Shed";
      case "EMPB5":
        return "Orbital Wrapper Shed / Canyonn Solar";
      case "EMPB6":
        return "Warehouse";
      default:
        return "unknown";
    }
  }

  useMemo(() => {
    for (const [key, value] of Object.entries(machineState.alarms.alarmTypes)) {
      if (value === 1) {
        const name = getName(key);
        console.log(machineState.enableEmail);
        if (machineState.enableEmail) {
          console.log("email sent!");
          sendEmail(name);
        }
        logAlarmData(name);
      }
    }
  }, [
    logAlarmData,
    machineState.alarms.alarmTypes,
    machineState.enableEmail,
    sendEmail,
  ]);

  const SendMessage = (location) => {
    setTag(location, 1);
  };

  function getAlarmColor(state) {
    switch (state) {
      case 1:
        return "bg-red-600 animate-pulse";
      case 0:
        return "bg-green-700 animate-pulse";
      case 2:
        return "bg-green-700 animate-pulse";
      case 4:
        return "bg-gray-600 opacity-50";
      default:
        return "bg-gray-600 opacity-50";
    }
  }

  return (
    <>
      {machineState.openPage === tags.Main && (
        <div className=" text-white gap-10 grid grid-cols-3 p-6">
          <div className=" bg-gray-700 border border-black shadow-lg flex-row w-[250px] lg:w-[280px] items-center flex h-[100px] rounded-lg ">
            <h1 className=" text-lg text-center px-6 py-4 min-w-[120px] font-medium ">
              Foyer
            </h1>
            <button
              disabled={machineState.alarms.alarmTypes.EMPB0 === 4}
              onClick={() => SendMessage("EMPB/0")}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.EMPB0,
                "Foyer"
              )} font-semibold rounded-xl border-l-4 border-black/50 group relative rounded-r-lg h-full w-full  items-center justify-center gap-1 flex flex-col p-2`}
            >
              <div className="absolute inset-0 w-1 bg-white/5 transition-all duration-[300ms] ease-out group-hover:w-full"></div>

              <svg
                className="w-6 h-6 text-white "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              {machineState.alarms.alarmTypes.EMPB0 === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 border border-black shadow-lg flex-row w-[250px] lg:w-[280px] items-center flex h-[100px] rounded-lg ">
            <h1 className=" text-center font-medium px-6 py-4 min-w-[120px] ">
              Factory Entrance
            </h1>
            <button
              onClick={() => SendMessage("EMPB/1")}
              disabled={machineState.alarms.alarmTypes.EMPB1 === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.EMPB1,
                "Entrance"
              )} font-semibold rounded-xl border-l-4 border-black/50 group relative rounded-r-lg h-full w-full items-center justify-center gap-1 flex flex-col p-2`}
            >
              <div className="absolute inset-0 w-1 bg-white/5 transition-all duration-[300ms] ease-out group-hover:w-full"></div>

              <svg
                className="w-6 h-6 text-white "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              {machineState.alarms.alarmTypes.EMPB1 === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 border border-black shadow-lg flex-row w-[250px]  lg:w-[280px] items-center flex h-[100px] rounded-lg ">
            <h1 className="  text-center font-medium px-6 py-4 min-w-[120px] ">
              De-coiler Roller Door
            </h1>
            <button
              onClick={() => SendMessage("EMPB/2")}
              disabled={machineState.alarms.alarmTypes.EMPB2 === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.EMPB2,
                "Workshop Strapper"
              )} font-semibold rounded-xl border-l-4 border-black/50 group relative rounded-r-lg h-full w-full items-center justify-center gap-1 flex flex-col p-2`}
            >
              <div className="absolute inset-0 w-1 bg-white/5 transition-all duration-[300ms] ease-out group-hover:w-full"></div>

              <svg
                className="w-6 h-6 text-white "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              {machineState.alarms.alarmTypes.EMPB2 === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 border border-black shadow-lg flex-row w-[250px]  lg:w-[280px] items-center flex h-[100px] rounded-lg ">
            <h1 className=" text-center font-medium px-6 py-4 min-w-[120px]">
              Main Workshop Door
            </h1>
            <button
              onClick={() => SendMessage("EMPB/3")}
              disabled={machineState.alarms.alarmTypes.EMPB3 === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.EMPB3,
                "Roller Door"
              )} font-semibold rounded-xl border-l-4 border-black/50 group relative rounded-r-lg h-full w-full items-center justify-center gap-1 flex flex-col p-2`}
            >
              <div className="absolute inset-0 w-1 bg-white/5 transition-all duration-[300ms] ease-out group-hover:w-full"></div>

              <svg
                className="w-6 h-6 text-white "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              {machineState.alarms.alarmTypes.EMPB3 === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 border border-black shadow-lg flex-row w-[250px] lg:w-[280px] items-center flex h-[100px] rounded-lg ">
            <h1 className=" text-center font-medium px-6 py-4 min-w-[120px] ">
              PCT Shed
            </h1>
            <button
              onClick={() => SendMessage("EMPB/4")}
              disabled={machineState.alarms.alarmTypes.EMPB4 === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.EMPB4,
                "Shed"
              )} font-semibold rounded-xl border-l-4 border-black/50 group relative rounded-r-lg h-full w-full items-center justify-center gap-1 flex flex-col p-2`}
            >
              <div className="absolute inset-0 w-1 bg-white/5 transition-all duration-[300ms] ease-out group-hover:w-full"></div>

              <svg
                className="w-6 h-6 text-white "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              {machineState.alarms.alarmTypes.EMPB4 === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 border border-black shadow-lg flex-row w-[250px]  lg:w-[280px] items-center flex h-[100px] rounded-lg ">
            <h1 className=" text-center font-medium px-6 py-4 min-w-[120px] ">
              Orbital Wrapper Shed
            </h1>
            <button
              onClick={() => SendMessage("EMPB/5")}
              disabled={machineState.alarms.alarmTypes.EMPB5 === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.EMPB5,
                "Wrapper Shed"
              )} font-semibold rounded-xl border-l-4 border-black/50 group relative rounded-r-lg h-full w-full items-center justify-center gap-1 flex flex-col p-2`}
            >
              <div className="absolute inset-0 w-1 bg-white/5 transition-all duration-[300ms] ease-out group-hover:w-full"></div>

              <svg
                className="w-6 h-6 text-white "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              {machineState.alarms.alarmTypes.EMPB5 === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 border border-black shadow-lg flex-row w-[250px]  lg:w-[280px] items-center flex h-[100px] rounded-lg ">
            <h1 className="  text-center font-medium px-6 py-4 min-w-[120px]">
              Warehouse
            </h1>
            <button
              onClick={() => SendMessage("EMPB/6")}
              disabled={machineState.alarms.alarmTypes.EMPB6 === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.EMPB6,
                "Warehouse"
              )} font-semibold rounded-xl border-l-4 border-black/50 group relative rounded-r-lg h-full w-full  items-center justify-center gap-1 flex flex-col p-2`}
            >
              <div className="absolute inset-0 w-1 bg-white/5 transition-all duration-[300ms] ease-out group-hover:w-full"></div>

              <svg
                className="w-6 h-6 text-white "
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
              </svg>
              {machineState.alarms.alarmTypes.EMPB6 === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
        </div>
      )}

      {machineState && machineState.openPage === tags.Settings && (
        <SettingsPanel />
      )}
    </>
  );
};

export default MainPanel;
