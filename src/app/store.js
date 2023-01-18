import userReducer from "../features/Auth/userSlice"
import socketReducer from "../components/socketSlice"
import groupReducer from "../features/Group/groupSlice"


import { configureStore } from "@reduxjs/toolkit";



const rootReducer={
    user:userReducer,
    socket:socketReducer,
    group:groupReducer,
};

const store=configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store;
