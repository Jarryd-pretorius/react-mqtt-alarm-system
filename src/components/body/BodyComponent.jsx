import React from "react";
import { useSelector } from "react-redux";
import { tags } from "../../slices/stateSlice";
import SettingsPanel from "../panels/SettingsPanel";
import MainPanel from "../panels/MainPanel";
import KeyboardComponent from "../KeyboardComponent";

const BodyComponent = () => {
  const currentState = useSelector((state) => state.stateSlice);

  return (
    <div className=" bg-gray-600  shadow-black items-center px-10 flex flex-row w-full h-full">
      {currentState.openPage === tags.Settings && <SettingsPanel />}
      {currentState.openPage === tags.Main && <MainPanel />}
      {currentState.keyBoardActive && <KeyboardComponent />}
    </div>
  );
};

export default BodyComponent;
