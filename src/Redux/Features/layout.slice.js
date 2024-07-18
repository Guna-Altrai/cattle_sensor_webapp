import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isSidebarOpen: true,
    isSidebarExpanded: true,
  },
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    expandSidebar: (state) => {
      state.isSidebarExpanded = !state.isSidebarExpanded;
    },
  },
});

export const { openSidebar, expandSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;
