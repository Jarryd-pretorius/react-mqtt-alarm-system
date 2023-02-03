import React from "react";
import logo from "../../images/OIYAicon.png";
import { useSelector } from "react-redux";
import useMqtt from "../../hooks/hook";

export const ControlsBar = () => {
  const machineState = useSelector((state) => state.stateSlice);
  const { plc, connectionStatus, setTag } = useMqtt("ws://localhost:9001");

  const startButton = () => setTag("hmi_Start", true);

  return (
    <div className="h-full items-center ml-auto px-2 pt-8 pb-4 flex flex-col bg-gray-700 gap-5">
      <div
        className={`${
          machineState.alarmTriggered
            ? "bg-red-600 text-white animate-pulse"
            : "bg-gray-400/50 text-white/50"
        }  py-4 px-8 flex flex-col items-center  shadow-lg font-semibold rounded-lg text-2xl  `}
      >
        <p>Alarm</p>
        {machineState.alarmTriggered && (
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="rgb(220 38 38)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
      <button
        onClick={startButton}
        className={`py-4 flex-col flex items-center px-8 text-white font-semibold shadow-lg rounded-lg text-2xl bg-green-700 `}
      >
        <p>Start</p>
        <svg
          width="30"
          height="30"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.23427 12.5657C7.92185 12.2533 7.92185 11.7467 8.23427 11.4343L11.6686 8.00001L8.23427 4.5657C7.92185 4.25328 7.92185 3.74675 8.23427 3.43433C8.54668 3.12191 9.05322 3.12191 9.36564 3.43433L13.3656 7.43433C13.6781 7.74675 13.6781 8.25328 13.3656 8.5657L9.36564 12.5657C9.05322 12.8781 8.54669 12.8781 8.23427 12.5657Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.43427 12.5657C3.12185 12.2533 3.12185 11.7467 3.43427 11.4343L6.86858 8.00001L3.43427 4.5657C3.12185 4.25328 3.12185 3.74675 3.43427 3.43433C3.74669 3.12191 4.25322 3.12191 4.56564 3.43433L8.56564 7.43433C8.87806 7.74675 8.87806 8.25328 8.56564 8.5657L4.56564 12.5657C4.25322 12.8781 3.74669 12.8781 3.43427 12.5657Z"
            fill="white"
          />
        </svg>
      </button>
      <button
        className={`py-4 flex-col flex items-center px-8  text-white font-semibold shadow-lg rounded-lg text-2xl bg-red-600 `}
      >
        <p>Stop</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 21.6C17.302 21.6 21.6 17.3019 21.6 12C21.6 6.69806 17.302 2.39999 12 2.39999C6.69809 2.39999 2.40002 6.69806 2.40002 12C2.40002 17.3019 6.69809 21.6 12 21.6ZM10.4486 8.75147C9.97992 8.28284 9.22013 8.28284 8.7515 8.75147C8.28287 9.22009 8.28287 9.97989 8.7515 10.4485L10.303 12L8.7515 13.5515C8.28287 14.0201 8.28287 14.7799 8.7515 15.2485C9.22012 15.7172 9.97992 15.7172 10.4486 15.2485L12 13.697L13.5515 15.2485C14.0201 15.7172 14.7799 15.7172 15.2486 15.2485C15.7172 14.7799 15.7172 14.0201 15.2486 13.5515L13.6971 12L15.2486 10.4485C15.7172 9.97989 15.7172 9.22009 15.2486 8.75147C14.7799 8.28284 14.0201 8.28284 13.5515 8.75147L12 10.3029L10.4486 8.75147Z"
            fill="white"
          />
        </svg>
      </button>
      <button
        className={`py-4 flex-col flex items-center px-8  text-white font-semibold shadow-lg rounded-lg text-2xl bg-[#3DA6EC] `}
      >
        <p>Reset</p>
        <svg
          width="30"
          height="30"
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.20002 1.59998C3.64185 1.59998 4.00002 1.95815 4.00002 2.39998V4.08098C5.0161 3.04388 6.43244 2.39998 8.00002 2.39998C10.4396 2.39998 12.5128 3.95943 13.2812 6.13338C13.4284 6.54995 13.2101 7.00701 12.7935 7.15425C12.3769 7.30148 11.9199 7.08315 11.7726 6.66657C11.2231 5.1119 9.7404 3.99998 8.00002 3.99998C6.69208 3.99998 5.52965 4.62799 4.79951 5.59998H7.20002C7.64185 5.59998 8.00002 5.95815 8.00002 6.39998C8.00002 6.8418 7.64185 7.19998 7.20002 7.19998H3.20002C2.7582 7.19998 2.40002 6.8418 2.40002 6.39998V2.39998C2.40002 1.95815 2.7582 1.59998 3.20002 1.59998ZM3.20656 8.8457C3.62313 8.69847 4.08019 8.91681 4.22743 9.33338C4.77692 10.888 6.25965 12 8.00002 12C9.30797 12 10.4704 11.372 11.2005 10.4L8.80002 10.4C8.3582 10.4 8.00003 10.0418 8.00003 9.59998C8.00003 9.15815 8.3582 8.79998 8.80002 8.79998H12.8C13.0122 8.79997 13.2157 8.88426 13.3657 9.03429C13.5157 9.18432 13.6 9.3878 13.6 9.59998V13.6C13.6 14.0418 13.2419 14.4 12.8 14.4C12.3582 14.4 12 14.0418 12 13.6V11.919C10.984 12.9561 9.56761 13.6 8.00002 13.6C5.5605 13.6 3.48726 12.0405 2.71888 9.86657C2.57164 9.45 2.78998 8.99294 3.20656 8.8457Z"
            fill="white"
          />
        </svg>
      </button>
      <img src={logo} className=" mt-auto w-24" alt="" />
    </div>
  );
};

export default ControlsBar;
