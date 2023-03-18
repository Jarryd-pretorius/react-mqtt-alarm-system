import React from "react";
import MainPanel from "../panels/MainPanel";

const BodyComponent = () => {
  return (
    <div className=" bg-gray-600  shadow-black items-center px-10 flex flex-row w-full h-full">
      <MainPanel />
    </div>
  );
};

export default BodyComponent;
