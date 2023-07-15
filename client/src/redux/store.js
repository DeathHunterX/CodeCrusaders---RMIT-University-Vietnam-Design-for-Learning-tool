import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import courseReducer from './slices/courseSlice'
import moduleReducer from './slices/moduleSlice'

export const store = configureStore({
    reducer: {
      auth: authReducer,
      course: courseReducer,
      module: moduleReducer,
    }
  });