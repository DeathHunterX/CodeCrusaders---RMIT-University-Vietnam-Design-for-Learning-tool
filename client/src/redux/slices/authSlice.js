import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {postDataAPI} from '../../utils/fetchData'

const user = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  user: user ? user : '',
  isError: null,
  isSuccess: null,
  isLoading: null,
  message: ''
}

// Register user
export const registerUser = createAsyncThunk('auth/register', async(userData, thunkAPI) => {
  try {
    console.log(userData)
    const res = await postDataAPI('auth/sign-up', userData)
    console.log(res)
    if(res.data) {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }

    return res.data
    
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const loginUser = createAsyncThunk('auth/login', async(userData, thunkAPI) => {
  try {
    const res = await postDataAPI('auth/sign-in', userData)
    console.log(res)
    if(res.data) {
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }
    return res.data

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
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = ''
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          console.log(action)
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = '';
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = '';
        })
    },
})
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer