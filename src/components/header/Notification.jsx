import React, { useState } from "react";
import { useSelector } from "react-redux";

export const Notification = () => {
  const state = useSelector((state) => state.stateSlice.notification);
  return (
    <div
      className={` ${
        state.success ? " bg-green-600" : " bg-red-600"
      }  transition-all ease-in-out duration-300 flex flex-row py-4 px-4 left-0 right-0 mx-auto w-2/4 items-center gap-3 text-white text-xl rounded-full justify-center  absolute`}
    >
      <h1 className=" font-semibold">{state.message}</h1>
      {state.success && (
        <svg
          width="30"
          height="30"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      {!state.success && (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default Notification;
