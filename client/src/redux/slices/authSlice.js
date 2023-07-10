import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {postDataAPI} from '../../utils/fetchData'

const initialState = {
  user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  isError: null,
  isSuccess: null,
  isLoading: null,
  message: ''
}

// Register user
export const registerUser = createAsyncThunk('auth/register', async(userData, thunkAPI) => {
  try {
    const res = await postDataAPI('/register', userData)
    if(res.data) {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const loginUser = createAsyncThunk('auth/login', async(userData, thunkAPI) => {
  try {
    const res = await postDataAPI('/login', userData)
    if(res.data) {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Log out user
export const logoutUser = createAsyncThunk('auth/logout', async() => {
  localStorage.removeItem('userInfo')
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null
        })
    },
})
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer