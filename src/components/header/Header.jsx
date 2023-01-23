import { useState, useEffect } from "react";
import Paho from "paho-mqtt";


const client = new Paho.Client(
  "localhost",
  Number(9001),
  `OIYA-${parseInt(Math.random() * 100)}`
);

const Header = () => {

  const [value, setValue] = useState(0);

  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/value")
        setValue(parseInt(message.payloadString));
  }

  useEffect(() => {
    client.connect( {
      onSuccess: () => { 
      console.log("Connected!");
      client.subscribe("mqtt-async-test/value");
      client.onMessageArrived = onMessage;
    },
    onFailure: () => {
      console.log("Failed to connect!"); 
    }
  });
  }, [])



  return (
    <div className=' flex gap-8 p-4 items-center flex-row w-screen bg-gray-500'>
    <div className=' py-4 px-6 rounded-lg text-xl bg-gray-300'>Status</div>
    <div className=' py-4 px-6 rounded-lg text-xl bg-green-300'>status is: {value}</div>
  </div>
  )
}

export default Header