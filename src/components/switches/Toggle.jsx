import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEnableEmail } from "../../slices/stateSlice";

export const Toggle = () => {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.stateSlice);
  const toggle = JSON.parse(localStorage.getItem("emailToggle"));

  useEffect(() => {
    if (toggle) {
      dispatch(setEnableEmail(toggle));
    }
  }, [dispatch, toggle]);

  const enableEmail = () => {
    localStorage.setItem(
      "emailToggle",
      JSON.stringify(!machineState.enableEmail)
    );
    dispatch(setEnableEmail(!machineState.enableEmail));
  };

  return (
    <div className="relative mt-4 flex flex-col overflow-hidden">
      <div className="flex">
        <label class="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={machineState.enableEmail}
            readOnly
          />
          <div
            onClick={() => {
              enableEmail();
            }}
            className="w-11 h-6 bg-gray-800 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
          <span className="ml-2 text-white font-medium">
            Enable Email notifications
          </span>
        </label>
      </div>
    </div>
  );
};
