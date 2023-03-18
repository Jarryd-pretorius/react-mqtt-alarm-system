import { useState, useEffect } from "react";
import mqtt from "precompiled-mqtt";
import { addTag } from "../slices/stateSlice";
import { useDispatch, useSelector } from "react-redux";
const useMqtt = (url) => {
  const dispatch = useDispatch();
  const [plc, setPlc] = useState({});
  const [client, setClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const currentState = useSelector((state) => state.stateSlice);

  // const [messages, setMessages] = React.useState([]);
  const setTag = (value) => {
    client.publish("publish/alarm", JSON.stringify(value));
  };
  useEffect(() => {
    const client = mqtt.connect("ws://localhost:9001"); //"ws://localhost:8888"
    client.on("connect", () => {
      setConnectionStatus(true);
      setClient(client);
      console.log("hook CONNECTED");
    });
    client.subscribe("EmPB");
    client.on("message", (topic, payload, packet) => {
      setPlc(JSON.stringify(JSON.parse(payload.toString()).alarmTypes));

      if (
        JSON.stringify(JSON.parse(payload.toString()).alarmTypes) !==
        JSON.stringify(currentState.alarms.alarmTypes)
      ) {
        dispatch(addTag(JSON.parse(payload.toString())));
        console.log(JSON.stringify(JSON.parse(payload.toString()).alarmTypes));
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

  return { plc, connectionStatus, setTag };
};

export default useMqtt;
