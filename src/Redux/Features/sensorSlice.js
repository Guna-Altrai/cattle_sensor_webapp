import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sensors: [],
};

export const sensorSlice = createSlice({
  name: "sensor",
  initialState,
  reducers: {
    addSensor: (state, { payload }) => {
      state.sensors.push(payload);
    },
    editSensor: (state, { payload }) => {
      const { id, name, ip_address, mac_address } = payload;
      const sensor = state.sensors.find((sensor) => sensor.id === id);
      if (sensor) {
        sensor.name = name;
        sensor.ip_address = ip_address;
        sensor.mac_address = mac_address;
      }
    },
    deleteSensor: (state, { payload }) => {
      state.sensors = state.sensors.filter((sensor) => sensor.id !== payload);
    },
    setSensors: (state, { payload }) => {
      state.sensors = payload;
    },
    resetSensor: () => initialState,
  },
});

export const { addSensor, editSensor, deleteSensor, setSensors, resetSensor } =
  sensorSlice.actions;

export default sensorSlice.reducer;
