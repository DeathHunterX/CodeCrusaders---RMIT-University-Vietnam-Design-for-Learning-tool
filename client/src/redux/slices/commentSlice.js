import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../../api/fetchData";

const initialState = {
    isLoading: false,
    isCreated: false,
    isEdited: false,
    isDeleted: false,
    isError: false,
    commentData: [],
    commentValue: {},
    message: "",
}

export const createComment = createAsyncThunk('comment/createComment', async({sharingID, commentData, token}, thunkAPI) => {
    try {
        const res = await postDataAPI(`links/${sharingID}/comments`, commentData, token);

        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const getComment = createAsyncThunk('comment/getComment', async({sharingID, token}, thunkAPI) => {
    try {
        const res = await getDataAPI(`links/${sharingID}/comments`, token);

        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const editComment = createAsyncThunk('comment/editComment', async({commentID, commentData, token}, thunkAPI) => {
    try {
        const res = await putDataAPI(`comments/${commentID}`, commentData, token);
        console.log(res.data)
        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})


export const deleteComment = createAsyncThunk('comment/deleteComment', async({commentID, token}, thunkAPI) => {
    try {
        const res = await deleteDataAPI(`comments/${commentID}`, token);
        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

const commentSlice = createSlice({
    name: "sharing",
    initialState,
    reducers: {
        resetCommentState: (state) => {
            state.isCreated = false;
            state.isEdited = false;
            state.isDeleted = false;
            state.isError = false;
            state.isReplied = false;
        },
        emptyCommentValue: (state) => {
            state.commentValue = {};
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Comment
            .addCase(createComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreated = true;
                state.commentValue = action.payload;
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
                state.commentData = action.payload;
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
                state.isEdited = true;
                state.commentValue = action.payload;
                state.message = "";
            })
            .addCase(editComment.rejected, (state, action) => {
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
                state.isDeleted = true;
                state.message = "";
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})
export const {resetCommentState, emptyCommentValue} = commentSlice.actions;
export default commentSlice.reducer;