import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getDataAPI, postDataAPI } from "../../api/fetchData"

const initialState = {
    isLoading: false,
    isGenerated: false,
    isError: false,
    linkAddress: "",
    sharingData: {},
    commentData: [],
    message: "",
}

export const generateLinkSharing = createAsyncThunk('sharing/generateLinkSharing', async({moduleID, token}, thunkAPI) => {
    console.log({moduleID, token})
    try {
        const res = await postDataAPI(`${moduleID}/generateSharingID`, "", token)

        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const getDataFromLinkSharing = createAsyncThunk('sharing/getDataFromLinkSharing', async({sharedID, token}, thunkAPI) => {
    try {
        const res = await getDataAPI(`${sharedID}`, token)

        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})


const sharingSlice = createSlice({
    name: "sharing",
    initialState,
    reducers: {
        getSharingAddress: (state, action) => {
            state.linkAddress = action.payload;
        },
        resetSharingState: (state) => {
            state.isGenerated = false;
            state.isError = false;
            state.linkAddress = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Generate link sharing
            .addCase(generateLinkSharing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(generateLinkSharing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isGenerated = true;
                state.linkAddress = action.payload?.shareLink;                ;
                state.message = "";
            })
            .addCase(generateLinkSharing.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Generate link sharing
            .addCase(getDataFromLinkSharing.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDataFromLinkSharing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sharingData = action.payload?.moduleDetailsResponse;
                state.commentData = action.payload?.comments;
                state.message = "";
            })
            .addCase(getDataFromLinkSharing.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {getSharingAddress, resetSharingState} = sharingSlice.actions
export default sharingSlice.reducer