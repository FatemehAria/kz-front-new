import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import generalReducer from "./features/user/generalSlice";

const store = configureStore({
  reducer: {
    userData: userReducer,
    general: generalReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;
