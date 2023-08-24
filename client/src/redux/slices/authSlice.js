import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from 'moment'
import jwt_decode from 'jwt-decode'
import {postDataAPI} from '../../api/fetchData'
import { clearTokens, getAccessToken, getRefreshToken,  setTokens } from "../../utils/CookieSetUp";

const user = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  user: user ? user : null,
  token: {
    accessToken: getAccessToken() ? getAccessToken() : null,
    refreshToken: getRefreshToken() ? getRefreshToken() : null
  },
  isError: null,
  isSuccess: null,
  isLoading: null,
  message: ''
}

// Register user
export const registerUser = createAsyncThunk('auth/register', async(userData, thunkAPI) => {
  try {
    const res = await postDataAPI('auth/sign-up', userData)
    
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
    if(res.data) {
      localStorage.setItem('userInfo', JSON.stringify({id:res.data?.id, name: res.data?.name, username: res.data?.username}))
      
      const accessTokenDecoded = jwt_decode(res.data?.token)

      const accessTokenExpiration = moment.unix(accessTokenDecoded.exp)
      const refreshTokenExpiration = moment().clone().add(6, 'hours')
      
      const combinedToken = `${res.data?.type ? res.data?.type : 'Bearer'} ${res.data?.token}`

      setTokens(combinedToken, res.data?.refreshToken, accessTokenExpiration, refreshTokenExpiration)
    }
    return res.data;

  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
})

// Log out user
export const logoutUser = createAsyncThunk('auth/logout', async() => {
  localStorage.removeItem('userInfo');
  clearTokens();
})

// State
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      },
      setAuthTokens: (state, action) => {
        state.token.accessToken = action.payload.accessToken;
        state.token.refreshToken = action.payload.refreshToken;
      }

    },
    extraReducers: (builder) => {
      builder
        // Register 
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload
          state.user = null
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null
        })

        // Login
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = {id: action.payload.id, name: action.payload.name, username: action.payload.username};

          state.token.accessToken = `${action.payload.type ? action.payload.type : 'Bearer'} ${action.payload.token}`;
          state.token.refreshToken = action.payload.refreshToken;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })

        // Log out
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.token.accessToken = null;
          state.token.refreshToken = null;
        })
    },
})
  
  export const { reset, setAuthTokens } = authSlice.actions
  export default authSlice.reducer