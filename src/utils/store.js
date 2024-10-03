import { configureStore } from "@reduxjs/toolkit";
import reducer from "./adminDashboardSlice/adminDashboardSlice.js";

export const store = configureStore({
  reducer: {
    admin: reducer,
  },
});
