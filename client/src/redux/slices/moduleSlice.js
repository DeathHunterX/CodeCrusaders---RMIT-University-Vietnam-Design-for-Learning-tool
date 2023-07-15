import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    module: {},
    message: ""
}

export const createModule = createAsyncThunk('module/createModule', async(token, thunkAPI) => {
    try {
        

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const editModule = createAsyncThunk('module/editModule', async(token, thunkAPI) => {
    try {
        

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const deleteModule = createAsyncThunk('module/deleteModule', async(token, thunkAPI) => {
    try {
        

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})



const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {

    },
    extraReducers: (builders) => {
        builders
            // Create Module
            .addCase(createModule.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createModule.fulfilled, (state, action) => {
                state.isLoading = false;
                state.module = action.payload;
                state.message = ""
            })
            .addCase(createModule.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })

            // Edit Module
            .addCase(editModule.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editModule.fulfilled, (state, action) => {
                state.isLoading = false;
                state.module = action.payload;
                state.message = ""
            })
            .addCase(editModule.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })

            // Delete Course
            .addCase(deleteModule.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteModule.fulfilled, (state, action) => {
                state.isLoading = false;
                state.module = ""
                state.message = ""
            })
            .addCase(deleteModule.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
    }
})

export default moduleSlice.reducer