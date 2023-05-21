import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Keyboard from "react-simple-keyboard";
import "../../src/keyboard.css";
import {
  setOpenKeyBoard,
  setInputValue,
  setMessageSend,
} from "../slices/stateSlice";

const KeyboardComponent = () => {
  const dispatch = useDispatch();
  const numpad = {
    default: ["1 2 3 {bksp}", "4 5 6 {enter}", "7 8 9 0"],
  };
  const [input, setInput] = useState("");
  const keyboard = useRef();

  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    if (button === "{enter}") handleSubmit();
  };

  const handleSubmit = () => {
    dispatch(setInputValue(input));
    dispatch(setMessageSend(true));
    dispatch(setOpenKeyBoard(false));
  };

  return (
    <div className="absolute w-full h-fit transition-all duration-500 ease-in-out flex flex-col items-center bg-gray-700/90 bottom-0">
      <div className="flex py-2 flex-row w-3/5 items-center ">
        <input
          className=" p-5 my-2 w-full bg-gray-500 rounded-lg text-lg text-white font-semibold"
          value={input}
          placeholder={"Tap on the keyboard to enter value"}
          onChange={onChangeInput}
        />
      </div>
      <Keyboard layout={numpad} onChange={onChange} onKeyPress={onKeyPress} />
    </div>
  );
};

export default KeyboardComponent;
