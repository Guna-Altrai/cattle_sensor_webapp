// sensorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveSensorData: {}, // Initialize an empty object for live sensor data
};

export const sensorSlice = createSlice({
  name: "sensor",
  initialState,
  reducers: {
    updateLiveSensorData: (state, action) => {
      const { sensorId, data } = action.payload;
      state.liveSensorData[sensorId] = data; // Update live sensor data by sensorId
    },
  },
});

export const { updateLiveSensorData } = sensorSlice.actions;

export default sensorSlice.reducer;
