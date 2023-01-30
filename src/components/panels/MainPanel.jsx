import React from "react";
import { useSelector } from "react-redux";
import { machineStates } from "../../store";
import former from "../../images/former.png";

const MainPanel = () => {
  const machineState = useSelector((state) => state.stateSlice);

  return (
    <div className="flex flex-row p-6">
      <div className="flex text-xl gap-4 flex-col">
        <div className="bg-gray-700 flex flex-col gap-2 px-5 rounded-md py-3 text-white">
          <h1 className="font-light">Winder Vertical Position:</h1>
          <p className="text-xl font-semibold">
            {machineState.tags.aiWinderVerticalPos} mm
          </p>
        </div>
        <div className="bg-gray-700 flex flex-col gap-2 px-5 py-3 rounded-md text-white">
          <h1 className="font-light">Winder Motor:</h1>
          <p className="text-xl font-semibold">
            {machineState.tags.lrActualVelocity} degrees
          </p>
        </div>
      </div>
      <div class="flex flex-col relative items-center">
        <div
          class={`${
            machineState.tags.iNutChuteLowSensor
              ? "bg-green-600"
              : "bg-yellow-500 animate-pulse"
          } absolute dot bg-green-600 top-[20%]`}
        ></div>
        <div
          class={` absolute dot ${
            machineState.tags.iWasherChuteLowSensor
              ? "bg-green-600"
              : "bg-yellow-500 animate-pulse"
          } top-[20%] left-[40%]`}
        ></div>
        <div
          class={`absolute dot ${
            machineState.tags.iNutChuteFullSensor
              ? "bg-green-600"
              : "bg-yellow-500 animate-pulse"
          } top-[40%] left-[38%]`}
        ></div>
        <div
          class={`${
            machineState.tags.iBaseInPos ? "bg-green-600" : "bg-yellow-600"
          } absolute dot top-[53%] left-[39%]`}
        ></div>
        <div
          class={`${
            machineState.tags.iWasherHopperReloadSensor
              ? "bg-green-600"
              : "bg-yellow-500 animate-pulse"
          } absolute dot top-[60%] left-[32%]`}
        ></div>
        <div
          class={`${
            machineState.tags.iWasherHopperReloadSensor
              ? "bg-green-600"
              : "bg-yellow-500 animate-pulse"
          } absolute dot top-[40%] left-[45%]`}
        ></div>
        <div
          class={`${
            machineState.tags.iNutHopperReloadSensor
              ? "bg-green-600"
              : "bg-yellow-500 "
          } absolute dot top-[53%] left-[45%]`}
        ></div>
        <img src={former} alt="Roll former" class="w-[70%]" />
      </div>
      <div className="flex text-center items-center rounded-md justify-center gap-1 py-1 px-3 flex-col max-w-md bg-gray-700">
        {machineStates.map((state) => (
          <p
            className={`${
              machineState.stage === state.code &&
              "bg-[#3DA6EC] font-semibold px-3 py-1"
            } text-sm text-white `}
          >
            {state.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MainPanel;
