import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";

const initialState = {
    isLoading: false,
    isSuccess: false,
    moduleList: [],
    message: ""
}

export const getModules = createAsyncThunk('module/getModules', async({id, token}, thunkAPI) => {
    try {
        const res = await getDataAPI(`courses/${id}/module-names`, token)
        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const createModule = createAsyncThunk('module/createModule', async({moduleData, id, token}, thunkAPI) => {
    try {
        const res = await postDataAPI(`course/${id}/create-module`, moduleData, token)
        return res.data

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

export const deleteModule = createAsyncThunk('module/deleteModule', async({id, token}, thunkAPI) => {
    try {
        const res = await deleteDataAPI(`/delete-module/${id}`, token)
        return {message: res.data, idToRemove: id}

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})



const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        resetModule: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builders) => {
        builders
            // Get Module
            .addCase(getModules.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getModules.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.moduleList = action.payload;
                state.message = ""
            })
            .addCase(getModules.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })

            // Create Module
            .addCase(createModule.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createModule.fulfilled, (state, action) => {
                state.isLoading = false;
                state.moduleList = [...state.moduleList, action.payload];
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
                state.moduleList = state.moduleList.filter((item) => item.id !== action.payload.idToRemove)
                state.message = action.payload.message
            })
            .addCase(deleteModule.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
    }
})

export const {resetModule} = moduleSlice.actions
export default moduleSlice.reducer