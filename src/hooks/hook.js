import React, { useState, useEffect } from "react";
import mqtt from "precompiled-mqtt";
import { addTag } from "../slices/stateSlice";
import { useDispatch } from "react-redux";
const useMqtt = (url) => {
  const dispatch = useDispatch();
  const [plc, setPlc] = useState({});
  const [client, setClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);
  // const [messages, setMessages] = React.useState([]);
  const setTag = (tag, value) => {
    client.publish("setTag", JSON.stringify({ tag, value }));
  };
  useEffect(() => {
    const client = mqtt.connect(url); //"ws://localhost:8888"
    client.on("connect", () => {
      setConnectionStatus(true);
      setClient(client);
      console.log("hook CONNECTED");
    });
    client.subscribe("PHAMPLC");
    client.on("message", (topic, payload, packet) => {
      setPlc(JSON.parse(payload.toString()));
      dispatch(addTag(JSON.parse(payload.toString())));
      console.log(payload.toString());
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
  }, []);

  return { plc, connectionStatus, setTag };
};

export default useMqtt;
