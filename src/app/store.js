import userReducer from "../features/Auth/userSlice"

import { configureStore } from "@reduxjs/toolkit";



const rootReducer={
    user:userReducer,
};

const store=configureStore({
    reducer: rootReducer,

})
export default store;
