import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import courseReducer from './slices/courseSlice'
import moduleReducer from './slices/moduleSlice'
import sessionReducer from './slices/sessionSlice'
import sharingReducer from './slices/sharingSlice'


const store = configureStore({
    reducer: {
      auth: authReducer,
      course: courseReducer,
      module: moduleReducer,
      session: sessionReducer,
      sharing: sharingReducer
    },

});

export default store;