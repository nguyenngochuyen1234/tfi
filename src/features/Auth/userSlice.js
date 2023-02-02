import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys.js';
export const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    const data = await userApi.register(payload)
    console.log("data:",data);
    //save local storages 
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.account));
    localStorage.setItem(StorageKeys.USERID, JSON.stringify(data.user._id));
    
    return data;
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
    console.log(data)
    return data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {account:JSON.parse(localStorage.getItem(StorageKeys.USER))} || {},

  },
  reducers: {
    logOut(state) {
      // clear local storage
      localStorage.clear()
      // set state
      state.current = {}

    },
    updateInfor(state,action){
      const clone={...state.current.account,...action.payload}
      localStorage.setItem("user",JSON.stringify(clone))
      state.current.account ={...clone} 
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
export const { logOut,updateInfor } = actions
export default reducer; 