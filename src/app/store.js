import userReducer from "../features/Auth/userSlice"
import socketReducer from "../compoments/socketSlice"
import { configureStore } from "@reduxjs/toolkit";



const rootReducer={
    user:userReducer,
    socket:socketReducer
};

const store=configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store;
