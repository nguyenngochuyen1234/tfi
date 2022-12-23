import {createSlice} from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: "auth",
    initialState:{
        authLoading: true,
        isAuthenticated: false,
        user: null
 
    },
    reducers: {
        setDataAuth(state, action){
            state.authLoading = action.payload.authLoading
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;