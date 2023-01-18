import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys.js';
export const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    const data = await userApi.register(payload)

    //save local storages 
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    localStorage.setItem(StorageKeys.USERID, JSON.stringify(data.user._id));
    
    return data.user;
  }
)
export const login = createAsyncThunk(
  'user/login',
  async (payload) => {
    const data = await userApi.login(payload)
    //save local storages 
    localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.account));
    localStorage.setItem(StorageKeys.USERID,data.account._id);
    localStorage.setItem(StorageKeys.NAMEUSER,data.account.name);
    return data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},

  },
  reducers: {
    logOut(state) {
      // clear local storage
      localStorage.clear()
      // set state
      state.current = {}

    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.current = action.payload

      });

  }
});

const { actions, reducer } = userSlice
export const { logOut } = actions
export default reducer; 