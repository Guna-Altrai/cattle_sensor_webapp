import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  persons: [
    { id: 1, name: "Person 1", type: "p1", devices: [] },
    { id: 2, name: "Person 2", type: "p2", devices: [] },
    { id: 3, name: "Person 3", type: "p3", devices: [] },
    { id: 4, name: "Person 4", type: "p4", devices: [] },
  ],
  lockedDevices: [],
  selectedDevices: [],
  imageUrl: null,
  mergedData: [],
  roomLength: null,
  roomBreadth: null,
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    addPerson: (state) => {
      const newId = state.persons.length + 1;
      state.persons.push({
        id: newId,
        name: `Person ${newId}`,
        type: `p${newId}`,
        devices: [],
      });
    },
    editPerson: (state, { payload }) => {
      const { id, newName } = payload;
      const person = state.persons.find((person) => person.id === id);
      if (person) {
        person.name = newName;
      }
    },
    deletePerson: (state, { payload }) => {
      const deletedPerson = state.persons.find(
        (person) => person.id === payload
      );
      if (deletedPerson) {
        deletedPerson.devices.forEach((device) => {
          state.lockedDevices = state.lockedDevices.filter(
            (id) => id !== device.id
          );
          state.selectedDevices = state.selectedDevices.filter(
            (d) => d.id !== device.id
          );
        });
      }
      state.persons = state.persons.filter((person) => person.id !== payload);
    },
    selectDevice: (state, { payload }) => {
      const { personId, device } = payload;
      const person = state.persons.find((person) => person.id === personId);
      if (person) {
        person.devices.push(device);
        state.lockedDevices.push(device.id);
        state.selectedDevices.push(device);
      }
    },
    deselectDevice: (state, { payload }) => {
      const { personId, deviceId } = payload;
      const person = state.persons.find((person) => person.id === personId);
      if (person) {
        person.devices = person.devices.filter(
          (device) => device.id !== deviceId
        );
        state.lockedDevices = state.lockedDevices.filter(
          (id) => id !== deviceId
        );
        state.selectedDevices = state.selectedDevices.filter(
          (device) => device.id !== deviceId
        );
      }
    },
    updateImageUrl: (state, { payload }) => {
      state.imageUrl = payload;
    },
    updateMergedData: (state, { payload }) => {
      state.mergedData = payload;
    },
    updateRoomDimensions: (state, { payload }) => {
      state.roomLength = payload.length;
      state.roomBreadth = payload.breadth;
    },
    resetState: () => initialState,
    resetMergedData: (state) => {
      state.mergedData = [];
    },
  },
});

export const {
  addPerson,
  editPerson,
  deletePerson,
  selectDevice,
  deselectDevice,
  updateImageUrl,
  updateMergedData,
  updateRoomDimensions,
  resetMergedData,
  resetState,
} = deviceSlice.actions;

export default deviceSlice.reducer;
