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
  enableEmail: false,
  alarms: {
    alarmLog: [],
    alarmTypes: {
      EMPB0: 0,
      EMPB1: 0,
      EMPB2: 0,
      EMPB3: 0,
      EMPB4: 0,
      EMPB5: 0,
      EMPB6: 0,
    },
  },

  keyBoardActive: false,
  messageSend: false,
  reset: false,
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
    addAlarmLogs: (state, action) => {
      state.alarms.alarmLog = action.payload;
    },
    setConnection: (state, action) => {
      state.connected = action.payload;
    },

    setEMPB0: (state, action) => {
      if (action.payload === state.alarms.alarmTypes.EMPB0) {
        return;
      }
      state.alarms.alarmTypes.EMPB0 = action.payload;
    },
    setEMPB1: (state, action) => {
      if (action.payload === state.alarms.alarmTypes.EMPB1) {
        return;
      }
      state.alarms.alarmTypes.EMPB1 = action.payload;
    },
    setEMPB2: (state, action) => {
      if (action.payload === state.alarms.alarmTypes.EMPB2) {
        return;
      }
      state.alarms.alarmTypes.EMPB2 = action.payload;
    },
    setEMPB3: (state, action) => {
      if (action.payload === state.alarms.alarmTypes.EMPB3) {
        return;
      }
      state.alarms.alarmTypes.EMPB3 = action.payload;
    },
    setEMPB4: (state, action) => {
      if (action.payload === state.alarms.alarmTypes.EMPB4) {
        return;
      }
      state.alarms.alarmTypes.EMPB4 = action.payload;
    },
    setEMPB5: (state, action) => {
      if (action.payload === state.alarms.alarmTypes.EMPB5) {
        return;
      }
      state.alarms.alarmTypes.EMPB5 = action.payload;
    },
    setEMPB6: (state, action) => {
      if (action.payload === state.alarms.alarmTypes.EMPB6) {
        return;
      }
      state.alarms.alarmTypes.EMPB6 = action.payload;
    },

    setOpenPage: (state, action) => {
      state.openPage = action.payload;
    },

    setMessageSend: (state, action) => {
      state.messageSend = action.payload;
    },
    setReset: (state, action) => {
      state.reset = action.payload;
    },
    setEnableEmail: (state, action) => {
      state.enableEmail = action.payload;
    },
  },
});

export const {
  addTag,
  setEMPB0,
  setEMPB1,
  setEMPB2,
  setEMPB3,
  setEMPB4,
  setEMPB5,
  setEMPB6,
  setOpenPage,
  setConnection,
  setOpenKeyBoard,
  addAlarmLogs,
  setOpenInput,
  setInputValue,
  setMessageSend,
  setEnableEmail,
  resetInput,
  setReset,
  setNotification,
} = stateSlice.actions;

export default stateSlice.reducer;
