import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from '../../api/fetchData';


const initialState = {
    isLoading: false,
    isCreated: false,
    isEdited: false,
    isDeleted: false,
    isError: false,
    allCourses: [],
    courses: [],
    course: {},
    message: ""
}

export const getEntireCourses = createAsyncThunk('courses/getEntireCourses', async({token}, thunkAPI) => {
    try {
        const res = await getDataAPI('all-courses', token)
        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const getAllCourses = createAsyncThunk('courses/getCourses', async(token, thunkAPI) => {
    try {
        const res = await getDataAPI('courses', token)
        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})


export const getCourse = createAsyncThunk('courses/getCourse', async({id, token}, thunkAPI) => {
    try {
        const res = await getDataAPI(`courses/${id}`, token)
        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const createCourse = createAsyncThunk('courses/createCourse', async({courseData, token}, thunkAPI) => {
    try {
        const res = await postDataAPI('create-course', courseData, token)

        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const updateCourse = createAsyncThunk('courses/updateCourse', async({courseData, id, token}, thunkAPI) => {
    try {
        const res = await putDataAPI(`update-course/${id}`, courseData, token)
        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})



export const deleteCourse = createAsyncThunk('courses/deleteCourse', async({id, token}, thunkAPI) => {
    try {
        const res = await deleteDataAPI(`delete-course/${id}`, token)

        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        resetState: (state) => {
            state.isCreated = false;
            state.isEdited = false;
            state.isDeleted = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get All Courses
            .addCase(getEntireCourses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEntireCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allCourses = action.payload?.courses;
                state.message = ""
            })
            .addCase(getEntireCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })

            // Get All Courses
            .addCase(getAllCourses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload;
                state.message = ""
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })

            // Get Course
            .addCase(getCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.course = action.payload;
                state.message = ""
            })
            .addCase(getCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })

            // Create Course
            .addCase(createCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreated = true;
                state.message = "";
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Update Course
            .addCase(updateCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isEdited = true
                state.course = action.payload;
                state.message = ""
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            
            // Delete Course
            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDeleted = true
                state.course = '';
                state.message = ""
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { resetState } = courseSlice.actions

export default courseSlice.reducer
