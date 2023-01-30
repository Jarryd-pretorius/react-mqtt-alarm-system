import { useSelector, useDispatch } from "react-redux";
import Paho from "paho-mqtt";
import { addTag, setConnection, setMessageSend } from "../../slices/stateSlice";
import React, { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.stateSlice);

  var client = new Paho.Client(
    "localhost",
    Number(9001),
    `OIYA-${parseInt(Math.random() * 100)}`
  );

  useEffect(() => {
    if (machineState.messageSend) {
      const payload = `${machineState.openInput.ref.replace(/\s/g, "")}=${
        machineState.openInput.input
      }`;

      try {
        const message = new Paho.MQTT.Message(payload);
        message.destinationName = "setTag";
        dispatch(setMessageSend(false));
        client.send(message);
      } catch {
        console.log("failed to send message");
      }

      return;
    }
  }, [
    machineState.messageSend,
    machineState.openInput.ref,
    machineState.openInput.value,
  ]);

  function onMessage(message) {
    dispatch(addTag(JSON.parse(message.payloadString).aiWinderVerticalPos));
  }
  const options = {
    timeout: 3,
    onSuccess: () => {
      console.log("Connected!");
      client.subscribe("PHAMPLC");
      dispatch(setConnection(true));
      client.onMessageArrived = onMessage;
    },
    onFailure: () => {
      console.log("Failed to connect!");
      dispatch(setConnection(false));
    },
  };

  client.onMessageArrived = onMessage;
  client.connect(options);

  return (
    <div className=" flex gap-8 p-4 items-center flex-row w-full bg-gray-700">
      <div
        className={`${
          machineState.safetyTripped
            ? "bg-yellow-600 text-white animate-pulse"
            : "bg-gray-400 text-black/50 opacity-50"
        } py-4 px-8  shadow-lg font-semibold rounded-lg text-center text-xl `}
      >
        Saftey Tripped
      </div>
      <div className="w-full flex gap-2 text-center flex-col">
        <div
          className={`${
            machineState.connected
              ? "bg-green-700"
              : "bg-gray-400/50 text-black/50"
          }  py-4 px-6 rounded-full text-white font-semibold text-xl`}
        >
          Status: {machineState.connected ? "Connected" : "Disconnected"}
        </div>
        <div className=" py-4 px-6 rounded-full font-semibold text-white text-xl bg-[#3DA6EC]">
          User: {machineState.user}
        </div>
      </div>
    </div>
  );
};

export default Header;
