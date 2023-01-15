import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupApi from '../../api/groupApi';
export const getAll = createAsyncThunk(
  'groups/all',
  async () => {
    const data = await groupApi.getAllGroupUser()
  
    //save local storages 
    return data;
  }
)


const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    current: {},
  },
  reducers: {
    
  },
  extraReducers: builder => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.current = action.payload
      })

  }
});

const { reducer } = groupSlice
export default reducer; 