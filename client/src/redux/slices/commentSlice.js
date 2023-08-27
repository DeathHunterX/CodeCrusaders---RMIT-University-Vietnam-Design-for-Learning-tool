import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isCreated: false,
    isEdit: false,
    isReply: false,
    isDelete: false,
    isError: false,
    commentData: [],
    message: "",
}

export const createComment = createAsyncThunk('comment/createComment', async({ token}, thunkAPI) => {

})

export const getComment = createAsyncThunk('comment/getComment', async({token}, thunkAPI) => {

})

export const editComment = createAsyncThunk('comment/editComment', async({token}, thunkAPI) => {

})

export const replyComment = createAsyncThunk('comment/replyComment', async({token}, thunkAPI) => {

})

export const deleteComment = createAsyncThunk('comment/deleteComment', async({token}, thunkAPI) => {

})

const commentSlice = createSlice({
    name: "sharing",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // Create Comment
            .addCase(createComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;


                state.message = "";
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Get Comment
            .addCase(getComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getComment.fulfilled, (state, action) => {
                state.isLoading = false;


                state.message = "";
            })
            .addCase(getComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Edit Comment
            .addCase(editComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editComment.fulfilled, (state, action) => {
                state.isLoading = false;


                state.message = "";
            })
            .addCase(editComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Reply Comment
            .addCase(replyComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(replyComment.fulfilled, (state, action) => {
                state.isLoading = false;


                state.message = "";
            })
            .addCase(replyComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false;


                state.message = "";
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })



        
    }
})

export default commentSlice.reducer