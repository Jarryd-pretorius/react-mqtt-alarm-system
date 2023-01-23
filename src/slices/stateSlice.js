import { createSlice } from '@reduxjs/toolkit'

export const tags = {
  Main: "Main",
  Settings: "Settings"
}

const initialState = {
  openPage: tags.Main,
  keyBoardActive: false,
  tags: null
}

export const stateSlice = createSlice({
  name: 'stateSlice',
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.tags = action.payload
    },
    setOpenPage: (state, action) => {
      state.openPage = action.payload
    }
  },
})

export const { addTag, setOpenPage } = stateSlice.actions

export default stateSlice.reducer