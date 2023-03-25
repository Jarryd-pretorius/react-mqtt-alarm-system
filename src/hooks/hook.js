import { useState, useEffect } from "react";
import mqtt from "precompiled-mqtt";
import {
  setEMPB0,
  setEMPB1,
  setEMPB2,
  setEMPB3,
  setEMPB4,
  setEMPB5,
  setEMPB6,
} from "../slices/stateSlice";
import { useDispatch, useSelector } from "react-redux";
const useMqtt = (url) => {
  const dispatch = useDispatch();
  const [plc, setPlc] = useState({});
  const [client, setClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const currentState = useSelector((state) => state.stateSlice);

  // const [messages, setMessages] = React.useState([]);
  const setTag = (channel, value) => {
    client.publish(channel, JSON.stringify(value));
  };

  const resetAlarm = () => {
    client.publish("EMPB/0", JSON.stringify(0));
    client.publish("EMPB/1", JSON.stringify(0));
    client.publish("EMPB/2", JSON.stringify(0));
    client.publish("EMPB/3", JSON.stringify(0));
    client.publish("EMPB/4", JSON.stringify(0));
    client.publish("EMPB/5", JSON.stringify(0));
    client.publish("EMPB/6", JSON.stringify(0));
  };

  useEffect(() => {
    const client = mqtt.connect("ws://localhost:9001"); //"ws://localhost:8888"
    client.on("connect", () => {
      setConnectionStatus(true);
      setClient(client);
      console.log("hook CONNECTED");
    });
    client.subscribe("EMPB/0");
    client.subscribe("EMPB/1");
    client.subscribe("EMPB/2");
    client.subscribe("EMPB/3");
    client.subscribe("EMPB/4");
    client.subscribe("EMPB/5");
    client.subscribe("EMPB/6");

    client.on("message", (topic, payload, packet) => {
      switch (topic) {
        case "EMPB/0":
          return dispatch(setEMPB0(JSON.parse(payload.toString())));
        case "EMPB/1":
          return dispatch(setEMPB1(JSON.parse(payload.toString())));
        case "EMPB/2":
          return dispatch(setEMPB2(JSON.parse(payload.toString())));
        case "EMPB/3":
          return dispatch(setEMPB3(JSON.parse(payload.toString())));
        case "EMPB/4":
          return dispatch(setEMPB4(JSON.parse(payload.toString())));
        case "EMPB/5":
          return dispatch(setEMPB5(JSON.parse(payload.toString())));
        case "EMPB/6":
          return dispatch(setEMPB6(JSON.parse(payload.toString())));
        default:
          return;
      }
    });

    client.on("offline", () => {
      console.log("goes OFFLINE");
      setConnectionStatus(false);
    });

    client.on("reconnect", () => {
      console.log("Reconnect event");
      // setConnectionStatus(false);
    });

    return () => {
      // client.off("message");
      client.end();
    };
  }, [currentState.alarms.alarmTypes, dispatch, plc]);

  return { plc, connectionStatus, setTag, resetAlarm };
};

export default useMqtt;
