import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import courseReducer from './slices/courseSlice'
import moduleReducer from './slices/moduleSlice'

// import {AxiosMiddleware} from '../api/axiosMiddleware'

const store = configureStore({
    reducer: {
      auth: authReducer,
      course: courseReducer,
      module: moduleReducer,
    },
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(AxiosMiddleware)
    // },
});

export default store;