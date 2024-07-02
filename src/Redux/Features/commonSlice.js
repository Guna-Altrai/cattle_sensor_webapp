import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  userName: null,
  userId: null,
  houseData: null,
  deviceData: null,
  sensorData: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateAuthCheckParams: (state, { payload }) => {
      state.userDetails = payload || state?.userDetails;
      state.userName = payload?.name || state?.userName;
      state.userId = payload?.id || state?.userId;
    },
    updateSensorData: (state, { payload }) => {
      state.sensorData = payload;
    },
    onLogout: () => initialState,
  },
});

export const {
  updateAuthCheckParams,
  onLogout,
  updateHouseData,
  updateDeviceData,
  updateSensorData,
} = commonSlice.actions;

export default commonSlice.reducer;
