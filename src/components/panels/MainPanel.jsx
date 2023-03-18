import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import useMqtt from "../../hooks/hook";
import { useEffect } from "react";
import { setConnection, setMessageSend } from "../../slices/stateSlice";
import { useState } from "react";

const MainPanel = () => {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.stateSlice);
  const [machine, setMachine] = useState(machineState);
  const { connectionStatus, setTag } = useMqtt(
    "mqtt://mosquitto@127.0.0.1:1883"
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

    console.log(templateParams);

    // emailjs
    //   .send(
    //     "service_dgso4uc",
    //     "template_3d1x4pr",
    //     templateParams,
    //     "C7ASYg3zD9tIvtK1w"
    //   )
    //   .then(
    //     function (response) {
    //       console.log("SUCCESS!", response.status, response.text);
    //     },
    //     function (error) {
    //       console.log("FAILED...", error);
    //     }
    //   );
  }, []);

  useEffect(() => {
    const resetObj = {
      foyer: 1,
      entrance: 1,
      workshopStrapper: 1,
      rollerDoor: 1,
      shed: 1,
      wrapperShed: 1,
      warehouse: 1,
    };

    dispatch(setConnection(connectionStatus));

    if (machineState.messageSend) {
      setTag(resetObj);
      dispatch(setMessageSend(false));
    }
  }, [connectionStatus, dispatch, machineState.messageSend, setTag]);

  useMemo(() => {
    for (const [key, value] of Object.entries(machineState.alarms.alarmTypes)) {
      if (value === 0) {
        sendEmail(key);
      }
    }
  }, [machineState.alarms.alarmTypes, sendEmail]);

  const SendMessage = (location) => {
    setTag({ tag: location, value: 0 });
  };

  function getAlarmColor(state, location) {
    switch (state) {
      case 0:
        return "bg-red-600 animate-pulse";
      case 1:
        return "bg-green-700";
      case 2:
        return "bg-green-700 animate-pulse";
      case 3:
        return "bg-orange-500";
      case 4:
        return "bg-gray-600 opacity-50";
      default:
        return "bg-gray-600 opacity-50";
    }
  }

  return (
    <>
      {machineState && (
        <div className="flex text-white gap-5 flex-col flex-wrap max-h-[600px] p-6">
          <div className=" bg-gray-700 shadow-lg flex-row w-[300px] items-center flex h-[100px] rounded-md ">
            <h1 className=" text-2xl px-12 py-4 w-[150px]">Foyer</h1>
            <button
              disabled={machineState.alarms.alarmTypes.foyer === 4}
              onClick={() => SendMessage("foyer")}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.foyer,
                "Foyer"
              )} font-semibold rounded-r-lg h-full w-full text-xl min-w-[200px]  items-center justify-center gap-1 flex flex-col p-2`}
            >
              {machineState.alarms.alarmTypes.foyer === 0 && (
                <svg
                  className="w-6 h-6 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
                </svg>
              )}
              {machineState.alarms.alarmTypes.foyer === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 shadow-lg flex-row items-center w-[300px] flex h-[100px] rounded-md ">
            <h1 className=" text-2xl px-12 py-4 max-w-[200px]">Entrance</h1>
            <button
              onClick={() => SendMessage("entrance")}
              disabled={machineState.alarms.alarmTypes.entrance === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.entrance,
                "Entrance"
              )} font-semibold rounded-r-lg h-full w-full text-xl min-w-[200px]  items-center justify-center gap-1 flex flex-col p-2`}
            >
              {machineState.alarms.alarmTypes.entrance === 0 && (
                <svg
                  className="w-6 h-6 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
                </svg>
              )}
              {machineState.alarms.alarmTypes.entrance === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 shadow-lg flex-row items-center max-w-[300px] w-[300px] flex h-[100px] rounded-md ">
            <h1 className=" text-2xl px-12 py-4 max-w-[200px]">Workshop</h1>
            <button
              onClick={() => SendMessage("WorkshopStrapper")}
              disabled={machineState.alarms.alarmTypes.workshopStrapper === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.workshopStrapper,
                "Workshop Strapper"
              )} font-semibold rounded-r-lg h-full w-full text-xl min-w-[200px]  items-center justify-center gap-1 flex flex-col p-2`}
            >
              {machineState.alarms.alarmTypes.workshopStrapper === 0 && (
                <svg
                  className="w-6 h-6 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
                </svg>
              )}
              {machineState.alarms.alarmTypes.workshopStrapper === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 shadow-lg flex-row items-center w-[300px] flex h-[100px] rounded-md ">
            <h1 className=" text-2xl px-12 py-4 w-[150px]">Foyer</h1>
            <button
              onClick={() => SendMessage("RollerDoor")}
              disabled={machineState.alarms.alarmTypes.rollerDoor === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.rollerDoor,
                "Roller Door"
              )} font-semibold rounded-r-lg h-full w-full text-xl min-w-[200px]  items-center justify-center gap-1 flex flex-col p-2`}
            >
              {machineState.alarms.alarmTypes.rollerDoor === 0 && (
                <svg
                  className="w-6 h-6 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
                </svg>
              )}
              {machineState.alarms.alarmTypes.rollerDoor === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 shadow-lg flex-row items-center w-[300px] flex h-[100px] rounded-md ">
            <h1 className=" text-2xl px-12 py-4 w-[150px]">Foyer</h1>
            <button
              onClick={() => SendMessage("Shed")}
              disabled={machineState.alarms.alarmTypes.shed === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.shed,
                "Shed"
              )} font-semibold rounded-r-lg h-full w-full text-xl  items-center justify-center gap-1 flex flex-col p-2`}
            >
              {machineState.alarms.alarmTypes.shed === 0 && (
                <svg
                  className="w-6 h-6 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
                </svg>
              )}
              {machineState.alarms.alarmTypes.shed === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 shadow-lg flex-row items-center w-[300px] flex h-[100px] rounded-md ">
            <h1 className=" text-2xl px-12 py-4 w-[150px]">Foyer</h1>
            <button
              onClick={() => SendMessage("WrapperShed")}
              disabled={machineState.alarms.alarmTypes.wrapperShed === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.wrapperShed,
                "Wrapper Shed"
              )} font-semibold rounded-r-lg h-full w-full text-xl  items-center justify-center gap-1 flex flex-col p-2`}
            >
              {machineState.alarms.alarmTypes.wrapperShed === 0 && (
                <svg
                  className="w-6 h-6 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
                </svg>
              )}
              {machineState.alarms.alarmTypes.wrapperShed === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
          <div className=" bg-gray-700 shadow-lg flex-row items-center w-[300px] flex h-[100px] rounded-md ">
            <h1 className=" text-2xl px-12 py-4 w-[150px]">Foyer</h1>
            <button
              onClick={() => SendMessage("Warehouse")}
              disabled={machineState.alarms.alarmTypes.warehouse === 4}
              className={`${getAlarmColor(
                machineState.alarms.alarmTypes.warehouse,
                "Warehouse"
              )} font-semibold rounded-r-lg h-full w-full text-xl  items-center justify-center gap-1 flex flex-col p-2`}
            >
              {machineState.alarms.alarmTypes.warehouse === 0 && (
                <svg
                  className="w-6 h-6 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M28 30H4v-2c0-1.657 1.343-3 3-3h18c1.657 0 3 1.343 3 3V30zM16 6c-.553 0-1-.448-1-1V3c0-.552.447-1 1-1s1 .448 1 1v2C17 5.552 16.553 6 16 6zM8.222 9.222c-.256 0-.512-.098-.707-.293L6.101 7.515c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l1.414 1.414c.391.391.391 1.023 0 1.414C8.733 9.124 8.478 9.222 8.222 9.222zM23.778 9.222c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l1.414-1.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-1.414 1.414C24.29 9.124 24.034 9.222 23.778 9.222zM5 17H3c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S5.553 17 5 17zM29 17h-2c-.553 0-1-.448-1-1s.447-1 1-1h2c.553 0 1 .448 1 1S29.553 17 29 17zM24 23v-7c0-4.411-3.589-8-8-8s-8 3.589-8 8v7H24zM16.034 11.876c.138-.535.684-.854 1.218-.718 1.759.455 3.135 1.831 3.59 3.591.139.535-.183 1.08-.717 1.219C20.041 15.99 19.956 16 19.873 16c-.444 0-.851-.299-.967-.75-.273-1.057-1.1-1.882-2.154-2.155C16.217 12.957 15.896 12.411 16.034 11.876z" />
                </svg>
              )}
              {machineState.alarms.alarmTypes.warehouse === 4
                ? "disconnected"
                : "Alarm"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPanel;
