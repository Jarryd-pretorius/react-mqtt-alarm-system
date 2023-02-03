import { useSelector, useDispatch } from "react-redux";
import {
  resetInput,
  setMessageSend,
  setNotification,
} from "../../slices/stateSlice";
import React, { useEffect } from "react";
import useMqtt from "../../hooks/hook";
import { Notification } from "./Notification";
import { getR010State, getModeState } from "./headerUtils";

const Header = () => {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.stateSlice);
  const { connectionStatus, setTag } = useMqtt("ws://localhost:9001");

  useEffect(() => {
    if (machineState.messageSend) {
      try {
        setTag(machineState.openInput.ref, machineState.openInput.input);
        dispatch(setMessageSend(false));
        dispatch(
          setNotification({
            message: `Success setting ${machineState.openInput.ref} to ${machineState.openInput.input}`,
            success: true,
            open: true,
          })
        );
        dispatch(resetInput());
        setTimeout(() => {
          dispatch(
            setNotification({
              message: "",
              success: false,
              open: false,
            })
          );
        }, 5000);
      } catch {
        dispatch(resetInput());
        dispatch(setMessageSend(false));
        dispatch(
          setNotification({
            message: `Failed setting ${machineState.openInput.ref} to ${machineState.openInput.input}`,
            success: false,
            open: true,
          })
        );
        setTimeout(() => {
          dispatch(
            setNotification({
              message: "",
              success: false,
              open: false,
            })
          );
        }, 5000);
      }
    }
  }, [dispatch, machineState.messageSend, machineState.openInput.ref, setTag]);

  return (
    <div className=" flex gap-8 p-4 items-center flex-row w-full bg-gray-700">
      {machineState.notification.open && <Notification />}
      <div className=" flex flex-col gap-2 w-1/5">
        <div
          className={`${"bg-black text-yellow-500"} py-4 px-8  shadow-lg font-semibold rounded-lg text-center text-lg `}
        >
          {getR010State(machineState.R010)}
        </div>
        <div
          className={` bg-red-700 text-white p-4 shadow-lg font-semibold rounded-lg text-center text-lg `}
        >
          {getModeState(machineState.mode)}
        </div>
      </div>
      <div className="w-full flex gap-2 text-center flex-col">
        <div
          className={`${
            connectionStatus ? "bg-green-700" : "bg-gray-400/50 text-black/50"
          } p-4 rounded-full text-white font-semibold text-xl`}
        >
          Status: {connectionStatus ? "Connected" : "Disconnected"}
        </div>
        <div className=" py-4 px-6 rounded-full font-semibold text-white text-xl bg-[#3DA6EC]">
          User: {machineState.user}
        </div>
      </div>
    </div>
  );
};

export default Header;
