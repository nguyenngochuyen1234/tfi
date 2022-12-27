import { createSlice } from "@reduxjs/toolkit"
import { loginUser, loadUser } from "./api/authThunk"
const authSlice = createSlice({
    name: "auth",
    initialState: {
        authLoading: true,
        isAuthenticated: false,
        user: null

    },
    reducers: {
        // setDataAuth(state, action) {
        //     state.authLoading = action.payload.authLoading
        //     state.isAuthenticated = action.payload.isAuthenticated
        //     state.user = action.payload.user
        // }
    },
    extraReducer: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.authLoading = true
                state.isAuthenticated = false;
                state.user = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authLoading = false
                state.isAuthenticated = true
                state.user = action.payload.data.user
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authLoading = false
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                console.log("12334")
                if(action.payload.data.success){
                    state.isAuthenticated =  true
                    state.user = action.payload.data.user
                    state.authLoading = false
                }
                else{
                    state.isAuthenticated =  false
                    state.user = null
                    state.authLoading = false
                }
            })
            .addCase(loadUser.pending, (state, action) => {
                console.log("12334")
                state.isAuthenticated =  true
                state.user = null
                state.authLoading = false
            })
            .addCase(loadUser.rejected, (state, action) => {
                console.log("12334")
                state.isAuthenticated =  false
                state.user = null
                state.authLoading = false
            })

    }
})

export const authActions = authSlice.actions;

export default authSlice;