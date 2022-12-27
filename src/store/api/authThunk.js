import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../contants';
// import { loadUser } from '../actions/authAction';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import setAuthToken from "../utils/setAuthToken"

// const dispatch = Dispatch()
//login

export const loginUser = createAsyncThunk('auth/loginUser',async(userform)=>{
  const response = await axios.post(`${apiUrl}/auth/login`, userform)
  if(response.data.success)
  localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
  // await dispatch(loadUser())
  return response})

export const registerUserPassword = createAsyncThunk('auth/registerUserPassword',async(userform)=>{
          const response = await axios.post(`${apiUrl}/auth/register`, userform)
          if (response.data.success)
            localStorage.setItem(
              LOCAL_STORAGE_TOKEN_NAME,
              response.data.accessToken
              )
              
          // await loadUser()
          return response})
export const loadUser = createAsyncThunk('auth/loadUser',async() =>{
    if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    }
      const response = await axios.get(`${apiUrl}/auth`)
      console.log(response)
      return response
})