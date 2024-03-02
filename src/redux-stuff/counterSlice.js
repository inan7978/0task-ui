// This file contains the definition of a Redux slice using createSlice from Redux Toolkit.
// A slice represents a piece of state and its associated reducers.
// In this case, the counterSlice slice manages a counter state with value as its initial state and defines increment and decrement reducers to update the counter value.

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    accessToken: "",
    refreshToken: "",
    _id: 0,
    fname: "",
    lname: "",
    email: "",
    tasks: [
      {
        description: "no tasks loaded",
        completed: false,
      },
    ],
  },
  reducers: {
    setAccess(state, action) {
      // action.payload is the payload of the action that was dispatched. It destructures it.
      const { valueName, data } = action.payload;
      state[valueName] = data;
    },
    setFields(state, action) {
      const { valueName, data } = action.payload;
      state[valueName] = data;
    },
  },
});

export const { setAccess, setFields } = counterSlice.actions;
export default counterSlice.reducer;
