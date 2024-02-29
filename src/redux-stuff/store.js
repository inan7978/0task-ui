// This file is responsible for creating the Redux store using configureStore from Redux Toolkit.
// It also imports and includes the counterReducer from counterSlice.js in the store's reducer setup.

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
