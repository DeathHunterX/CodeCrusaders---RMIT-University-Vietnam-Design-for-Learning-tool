import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isGenerated: false,
    isError: false,
    linkAddress: {},
    sharingData: {},
    message: "",
}

export const generateLinkSharing = createAsyncThunk('sharing/generateLinkSharing', async({ token}, thunkAPI) => {

})

export const getDataFromLinkSharing = createAsyncThunk('sharing/getDataFromLinkSharing', async({token}, thunkAPI) => {

})


const sharingSlice = createSlice({
    name: "sharing",
    initialState,
    reducers: {

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
                state.linkAddress = action.payload;
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

                state.sharingData = action.payload;
                state.message = "";
            })
            .addCase(getDataFromLinkSharing.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export default sharingSlice.reducer