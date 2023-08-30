import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {postDataAPI} from '../../api/fetchData'


const user = JSON.parse(localStorage.getItem('userInfo'))

const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
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

      const combinedToken = `${res.data?.type ? res.data?.type : 'Bearer'} ${res.data?.token}`

      localStorage.setItem("token", JSON.stringify({accessToken: combinedToken, refreshToken: res.data?.refreshToken}))
      
    }
    return res.data;

  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
  }
})



// State
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      resetState: (state) => {
        state.isSuccess = false;
        state.isError = false;
      },
      setAuthTokens: (state, action) => {
        state.token.accessToken = action.payload.accessToken;
        state.token.refreshToken = action.payload.refreshToken;
      },
      logOutUser: (state) => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        state.user = null;
        state.token.accessToken = null;
        state.token.refreshToken = null;
        window.location.href = "/login"
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
          state.user = {id: action.payload.id, name: action.payload.name, username: action.payload.username};
          state.token = {
            accessToken: `${action.payload.type ? action.payload.type : 'Bearer'} ${action.payload.token}`,
            refreshToken: action.payload.refreshToken,
          }
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
    },
})
  
  export const { resetState, logOutUser, setAuthTokens } = authSlice.actions
  export default authSlice.reducer