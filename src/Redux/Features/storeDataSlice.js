// deviceSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historicalData: [],
};

export const storeData = createSlice({
  name: "storedata",
  initialState,
  reducers: {
    addHistoricalData: (state, action) => {
      state.historicalData.push(action.payload);
    },
    resetHistoricalData: (state) => {
      state.historicalData = initialState.historicalData;
    },
  },
});

export const { addHistoricalData, resetHistoricalData } = storeData.actions;

export default storeData.reducer;
