import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tags, setOpenPage, setMessageSend } from "../../slices/stateSlice";

const Footer = () => {
  const openPage = useSelector((state) => state.stateSlice.openPage);
  const dispatch = useDispatch();

  return (
    <div className=" flex gap-8 p-6 items-center flex-row w-full bg-gray-700">
      <button
        className={`py-6 px-10 rounded-lg font-semibold  text-xl ${
          openPage === tags.Main ? "bg-[#3DA6EC] text-white" : " bg-gray-300"
        } `}
        onClick={() => dispatch(setOpenPage(tags.Main))}
      >
        Main
      </button>
      <button
        className={` py-6 px-10 rounded-lg font-semibold text-xl ${
          openPage === tags.Settings
            ? " bg-[#3DA6EC] text-white"
            : " bg-gray-300"
        } `}
        onClick={() => dispatch(setOpenPage(tags.Settings))}
      >
        Alarm Log
      </button>
      <button
        className={` py-6 px-10  ml-auto rounded-lg font-semibold text-xl hover:bg-[#3DA6EC] hover:text-white bg-gray-300
          
        `}
        onClick={() => dispatch(setMessageSend(true))}
      >
        Reset{" "}
      </button>
    </div>
  );
};

export default Footer;
