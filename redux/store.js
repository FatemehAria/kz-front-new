import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    userRole: userReducer,
  },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

});
export default store;
