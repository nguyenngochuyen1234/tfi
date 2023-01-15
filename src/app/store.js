import userReducer from "../features/Auth/userSlice"
import groupReducer from "../features/Group/groupSlice"


import { configureStore } from "@reduxjs/toolkit";



const rootReducer={
    user:userReducer,
    group:groupReducer,
};

const store=configureStore({
    reducer: rootReducer,

})
export default store;
