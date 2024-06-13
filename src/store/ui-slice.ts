import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { test: false },
  reducers: {},
});

export const uiActions = uiSlice.actions;

export default uiSlice;
