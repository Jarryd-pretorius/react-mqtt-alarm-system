import React from "react";
import MainPanel from "../panels/MainPanel";

const BodyComponent = () => {
  return (
    <div className=" bg-gray-600  shadow-black h-screen justify-center items-center px-10 flex flex-row w-full">
      <MainPanel />
    </div>
  );
};

export default BodyComponent;
