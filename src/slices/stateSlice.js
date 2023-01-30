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
  keyBoardActive: false,
  openInput: {
    ref: "",
    input: "",
  },
  messageSend: false,
  connected: false,
  safetyTripped: false,
  alarmTriggered: false,
  user: "Operator",
  tags: {
    aiWinderVerticalPos: 2000,
    lrActualVelocity: 30,
    iWasherChuteLowSensor: true,
    iNutChuteFullSensor: true,
    iNutChuteLowSensor: false,
    iBaseInPos: true,
    iWasherHopperReloadSensor: false,
    iNutHopperReloadSensor: true,
  },
  stage: "R50",
};

export const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.tags = action.payload;
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

    setOpenInput: (state, action) => {
      state.openInput.ref = action.payload;
    },

    setInputValue: (state, action) => {
      state.openInput.input = action.payload;
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
} = stateSlice.actions;

export default stateSlice.reducer;
