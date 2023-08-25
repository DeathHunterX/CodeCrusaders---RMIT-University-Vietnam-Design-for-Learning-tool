import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDataAPI, getDataAPI, postDataAPI } from "../../api/fetchData";

const initialState = {
    isLoading: false,
    isSuccess: false,
    moduleList: [],
    moduleItem: {},
    moduleMessage: "",
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

export const getModuleInfo = createAsyncThunk('module/getModule', async({id, token}, thunkAPI) => {
    try {
        const res = await getDataAPI(`modules/${id}`, token)
        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const createModule = createAsyncThunk('module/createModule', async({moduleData, id, token}, thunkAPI) => {
    try {
        const res = await postDataAPI(`courses/${id}/create-module`, moduleData, token)
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
        console.log(res)

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
        
    },
    extraReducers: (builders) => {
        builders
            // Get Modules
            .addCase(getModules.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getModules.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.moduleList = action.payload.message ? [] : action.payload;
                state.moduleMessage = action.payload.message
            })
            .addCase(getModules.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })

            // Get Module by Id
            .addCase(getModuleInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getModuleInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.moduleItem = action.payload;
            })
            .addCase(getModuleInfo.rejected, (state, action) => {
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

export default moduleSlice.reducer