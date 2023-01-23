import { configureStore } from '@reduxjs/toolkit'
import stateSliceReducer from '../slices/stateSlice'

export const store = configureStore({
  reducer: {
    stateSlice: stateSliceReducer,

  },
})