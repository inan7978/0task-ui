// This file contains the definition of a Redux slice using createSlice from Redux Toolkit.
// A slice represents a piece of state and its associated reducers.
// In this case, the counterSlice slice manages a counter state with value as its initial state and defines increment and decrement reducers to update the counter value.

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
