import { useSelector } from "react-redux";
import React from "react";
import { Notification } from "./Notification";

const Header = () => {
  const machineState = useSelector((state) => state.stateSlice);
  return (
    <div className=" flex gap-8 py-6 px-16  items-center flex-row w-full bg-gray-700">
      {machineState.notification.open && <Notification />}
      <h1 className=" text-white font-semibold text-2xl">
        Emergency Siren Location Board
      </h1>
      {!machineState.connected && (
        <svg
          className="w-9 h-9 text-white ml-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          stroke="none"
        >
          <path d="M6.92,5.51h0L3.71,2.29A1,1,0,0,0,2.29,3.71L4.56,6A15.21,15.21,0,0,0,1.4,8.39a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.7-.29A13.07,13.07,0,0,1,6.05,7.46L7.54,9a10.78,10.78,0,0,0-3.32,2.27,1,1,0,1,0,1.42,1.4,8.8,8.8,0,0,1,3.45-2.12l1.62,1.61a7.07,7.07,0,0,0-3.66,1.94,1,1,0,1,0,1.42,1.4A5,5,0,0,1,12,14a4.13,4.13,0,0,1,.63.05l7.66,7.66a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM12,16a3,3,0,1,0,3,3A3,3,0,0,0,12,16Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,20ZM22.61,8.39A15,15,0,0,0,10.29,4.1a1,1,0,1,0,.22,2A13.07,13.07,0,0,1,21.2,9.81a1,1,0,0,0,1.41-1.42Zm-4.25,4.24a1,1,0,0,0,1.42-1.4,10.75,10.75,0,0,0-4.84-2.82,1,1,0,1,0-.52,1.92A8.94,8.94,0,0,1,18.36,12.63Z" />
        </svg>
      )}
      {machineState.connected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 text-green-400 ml-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 14a1.99 1.99 0 0 0-1.981 2c0 1.104.887 2 1.981 2a1.99 1.99 0 0 0 1.98-2c0-1.105-.886-2-1.98-2zm-4.2-2.242 1.4 1.414a3.933 3.933 0 0 1 5.601 0l1.399-1.414a5.898 5.898 0 0 0-8.4 0zM3 8.928l1.4 1.414a7.864 7.864 0 0 1 11.199 0L17 8.928a9.831 9.831 0 0 0-14 0zM.199 6.1l1.4 1.414a11.797 11.797 0 0 1 16.801 0L19.8 6.1a13.763 13.763 0 0 0-19.601 0z" />
        </svg>
      )}
    </div>
  );
};

export default Header;
