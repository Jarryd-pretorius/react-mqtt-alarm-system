import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tags, setOpenPage, setMessageSend } from "../../slices/stateSlice";

const Footer = () => {
  const openPage = useSelector((state) => state.stateSlice.openPage);
  const [fullScreen, SetFullscreen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (fullScreen) {
      document.body.requestFullscreen();
      return;
    }
    document.exitFullscreen();
  }, [fullScreen]);
  return (
    <div className=" flex gap-8 py-6 px-16 items-center sticky bottom-0 flex-row w-full bg-gray-700">
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
      <button
        className={` py-6 px-5 rounded-lg font-semibold text-xl bg-[#3DA6EC] hover:text-white 
          
        `}
        onClick={() => SetFullscreen(!fullScreen)}
      >
        <svg
          width="30"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 8V4M4 4H8M4 4L9 9M20 8V4M20 4H16M20 4L15 9M4 16V20M4 20H8M4 20L9 15M20 20L15 15M20 20V16M20 20H16"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Footer;
