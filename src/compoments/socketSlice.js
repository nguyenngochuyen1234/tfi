import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload
    }
  }
});

const { actions, reducer } = socketSlice
export const  socketActions  = socketSlice.actions
export default reducer; 