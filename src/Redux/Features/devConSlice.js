import { createSlice } from "@reduxjs/toolkit";

const initialDeviceConsumption = {
  deviceConsumptionData: {},
};

export const devConSlice = createSlice({
  name: "consumption",
  initialState: initialDeviceConsumption,
  reducers: {
    updateDeviceConsumptionData: (state, { payload }) => {
      state.deviceConsumptionData = {
        ...state.deviceConsumptionData,
        ...payload,
      };
    },
    removeDevCon: () => initialState,
  },
});

export const { updateDeviceConsumptionData, removeDevCon } =
  devConSlice.actions;

export default devConSlice.reducer;
