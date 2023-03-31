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
  const [EMPB0timer, setEMPB0timer] = useState(0);
  const [EMPB1timer, setEMPB1timer] = useState(0);
  const [EMPB2timer, setEMPB2timer] = useState(0);
  const [EMPB3timer, setEMPB3timer] = useState(0);
  const [EMPB4timer, setEMPB4timer] = useState(0);
  const [EMPB5timer, setEMPB5timer] = useState(0);
  const [EMPB6timer, setEMPB6timer] = useState(0);

  const currentState = useSelector((state) => state.stateSlice);

  useEffect(() => {
    const interval = setInterval(() => {
      setEMPB0timer(EMPB0timer + 1);
      setEMPB1timer(EMPB1timer + 1);
      setEMPB2timer(EMPB2timer + 1);
      setEMPB3timer(EMPB3timer + 1);
      setEMPB4timer(EMPB4timer + 1);
      setEMPB5timer(EMPB5timer + 1);
      setEMPB6timer(EMPB6timer + 1);
    }, 1000);

    if (EMPB0timer === 5) {
      dispatch(setEMPB0(4));
    }
    if (EMPB1timer === 5) {
      dispatch(setEMPB1(4));
    }
    if (EMPB2timer === 5) {
      dispatch(setEMPB2(4));
    }
    if (EMPB3timer === 5) {
      dispatch(setEMPB3(4));
    }
    if (EMPB4timer === 5) {
      dispatch(setEMPB4(4));
    }
    if (EMPB5timer === 5) {
      dispatch(setEMPB5(4));
    }
    if (EMPB6timer === 5) {
      dispatch(setEMPB6(4));
    }

    return () => clearInterval(interval);
  }, [
    dispatch,
    EMPB0timer,
    EMPB1timer,
    EMPB2timer,
    EMPB3timer,
    EMPB4timer,
    EMPB5timer,
    EMPB6timer,
  ]);

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

  const setAlarm0 = (payload) => {
    setEMPB0timer(0);
    dispatch(setEMPB0(JSON.parse(payload.toString())));
  };
  const setAlarm1 = (payload) => {
    setEMPB1timer(0);
    dispatch(setEMPB1(JSON.parse(payload.toString())));
  };
  const setAlarm2 = (payload) => {
    setEMPB2timer(0);
    dispatch(setEMPB2(JSON.parse(payload.toString())));
  };
  const setAlarm3 = (payload) => {
    setEMPB3timer(0);
    dispatch(setEMPB3(JSON.parse(payload.toString())));
  };
  const setAlarm4 = (payload) => {
    setEMPB4timer(0);
    dispatch(setEMPB4(JSON.parse(payload.toString())));
  };
  const setAlarm5 = (payload) => {
    setEMPB5timer(0);
    dispatch(setEMPB5(JSON.parse(payload.toString())));
  };
  const setAlarm6 = (payload) => {
    setEMPB6timer(0);
    dispatch(setEMPB6(JSON.parse(payload.toString())));
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
          return setAlarm0(payload);
        case "EMPB/1":
          return setAlarm1(payload);
        case "EMPB/2":
          return setAlarm2(payload);
        case "EMPB/3":
          return setAlarm3(payload);
        case "EMPB/4":
          return setAlarm4(payload);
        case "EMPB/5":
          return setAlarm5(payload);
        case "EMPB/6":
          return setAlarm6(payload);
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
