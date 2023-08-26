import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postDataAPI } from "../../api/fetchData";

const initialState = {
    session: {},
    activityItem: {}
}

export const createActivity = createAsyncThunk('session/createActivity', async({sessionData, id, subId, token}, thunkAPI) => {
    try {
        const res = await postDataAPI(`courses/${id}/sessions/${subId}/create-activity`, sessionData, token)
        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // Create Module
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.moduleList = [...state.moduleList, action.payload];
                state.message = ""
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            })
    }
})

export default sessionSlice.reducer