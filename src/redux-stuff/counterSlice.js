// This file contains the definition of a Redux slice using createSlice from Redux Toolkit.
// A slice represents a piece of state and its associated reducers.
// In this case, the counterSlice slice manages a counter state with value as its initial state and defines increment and decrement reducers to update the counter value.

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    value2: 99,
    value3: false,
    value8: "hell yea",
  },
  reducers: {
    increment(state, action) {
      // action.payload is the payload of the action that was dispatched. It destructures it.
      const { valueName, data } = action.payload;
      state[valueName] += data;
    },
    decrement(state, action) {
      // action.payload is the payload of the action that was dispatched. It destructures it.
      const { valueName, data } = action.payload;
      state[valueName] -= data;
    },
    setZero(state, action) {
      // action.payload is the payload of the action that was dispatched. It destructures it.
      const { valueName, data } = action.payload;
      state[valueName] = 0;
    },
  },
});

export const { increment, decrement, setZero } = counterSlice.actions;
export default counterSlice.reducer;
