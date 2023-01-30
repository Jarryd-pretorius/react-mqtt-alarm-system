import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setOpenKeyBoard,
  inputFieldType,
  setOpenInput,
} from "../../slices/stateSlice";

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const currentState = useSelector((state) => state.stateSlice);

  const OpenKeyboard = (event) => {
    console.log(ref.current.id);
    dispatch(setOpenInput(ref.current.id));
    dispatch(setOpenKeyBoard(!currentState.keyBoardActive));
  };

  return (
    <div className="flex flex-row w-full p-10">
      <div className="flex flex-col">
        <div className="flex flex-row hover:bg-slate-500 gap-2 items-center bg-gray-500 px-3 py-2 rounded">
          <h1 className=" text-xl text-white">{inputFieldType.HomePos}</h1>
          <p className=" text-lg"></p>
          <button
            id={inputFieldType.HomePos}
            ref={ref}
            onClick={OpenKeyboard}
            className=" rounded-md px-4 w-[150px] py-1 border font-semibold border-gray-600 text-white"
          >
            Value
          </button>
          <h1 className=" text-xl text-white">mm</h1>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
