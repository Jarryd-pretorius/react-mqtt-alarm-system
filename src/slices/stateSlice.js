import { createSlice } from "@reduxjs/toolkit";

export const tags = {
  Main: "Main",
  Settings: "Settings",
};

export const inputFieldType = {
  HomePos: "Home Pos",
};

const initialState = {
  openPage: tags.Main,
  alarms: {
    alarmLog: [],
    alarmTypes: {
      foyer: 1,
      entrance: 1,
      workshopStrapper: 1,
      rollerDoor: 1,
      shed: 1,
      wrapperShed: 1,
      warehouse: 1,
    },
  },

  keyBoardActive: false,
  messageSend: false,
  notification: {
    message: "",
    success: false,
    open: false,
  },
  connected: false,
};

export const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    addTag: (state, action) => {
      if (state.alarms === action.payload) {
        console.log("return");
      }
      state.alarms = action.payload;
    },
    setConnection: (state, action) => {
      state.connected = action.payload;
    },

    setOpenPage: (state, action) => {
      state.openPage = action.payload;
    },

    setOpenKeyBoard: (state, action) => {
      state.keyBoardActive = action.payload;
    },

    setNotification: (state, action) => {
      state.notification = action.payload;
    },

    setMessageSend: (state, action) => {
      state.messageSend = action.payload;
    },
  },
});

export const {
  addTag,
  setOpenPage,
  setConnection,
  setOpenKeyBoard,
  setOpenInput,
  setInputValue,
  setMessageSend,
  resetInput,
  setNotification,
} = stateSlice.actions;

export default stateSlice.reducer;
