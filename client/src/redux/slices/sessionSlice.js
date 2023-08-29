import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../../api/fetchData";

const initialState = {
    isLoading: false,
    isCreated: false,
    isSessionUpdated: false,
    isActivityUpdated: false,
    isDeleted: false,
    isError: false,
    sessions: [],
    activityItem: {},
    message: ""
}

export const createActivity = createAsyncThunk('session/createActivity', async({courseID, sessionID, activityData, token}, thunkAPI) => {
    try {
        const res = await postDataAPI(`courses/${courseID}/sessions/${sessionID}/create-activity`, activityData, token)

        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const getSessions = createAsyncThunk('session/getSessions', async({moduleID, token}, thunkAPI) => {
    try {
        const res = await getDataAPI(`modules/${moduleID}/sessions`, token)
        return res.data

    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const updateActivity = createAsyncThunk('session/updateActivity', async({courseID, activityID, activityData, token}, thunkAPI) => {
    try {
        const res = await putDataAPI(`courses/${courseID}/activities/${activityID}/update-activity`, activityData, token)

        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
    
})

export const updateSessions = createAsyncThunk('session/updateSessions', async({courseID, moduleID, sessionData, token}, thunkAPI) => {
    console.log({courseID, moduleID, sessionData, token})
    try {
        const res = await putDataAPI(`courses/${courseID}/modules/${moduleID}/save-activity-lists`, sessionData, token)

        console.log(res)
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

export const deleteActivity = createAsyncThunk('session/deleteActivity', async({courseID, sessionID, activityID, token}, thunkAPI) => {
    console.log({courseID, sessionID, activityID, token})
    try {
        const res = await deleteDataAPI(`courses/${courseID}/sessions/${sessionID}/activities/${activityID}`, token)

        return res.data
    } catch (err) {
        const errMessage = err.response?.data?.message || err.message;
        return thunkAPI.rejectWithValue(errMessage);
    }
})

const reorderSession = (sessionData) => {
    if (!Array.isArray(sessionData)) {
        return; // Return early if sessionList is not an array
    }

    const formattedSessions = sessionData.map(item => ({
        id: item.id,
        sessionName: item.sessionName,
        totalDuration: item.totalDuration,
        activityList: item.activityList,
    }));

    let desiredOrder = ['Pre_class', 'In_class', 'Post_class'];

    // Reorder the sessions based on the desired order
    let reorderedSessions = desiredOrder.map(sessionName => {
        const session = formattedSessions.find(session => session.sessionName === sessionName);
        return session !== undefined ? session : null; // Return null for undefined sessions
    });

    // Remove null values from the reorderedSessions array
    return reorderedSessions.filter(session => session !== null);
}


const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        addUpdateSessionState: (state, action) => {
            state.sessions = action.payload;
        },
        resetSessionState: (state) => {
            state.isCreated = false;
            state.isError = false;
            state.isSessionUpdated = false;
            state.isActivityUpdated = false;
            state.isDeleted = false;
        },
        emptyActivityItem: (state) => {
            state.activityItem = {};
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Activity
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreated = true;
                state.activityItem = action.payload;
                state.message = "";
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Get Sessions
            .addCase(getSessions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSessions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sessions = reorderSession(action.payload?.sessionList);
                state.message = "";
            })
            .addCase(getSessions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Update Activity
            .addCase(updateActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isActivityUpdated = true;
                state.activityItem = action.payload;
                state.message = "";
            })
            .addCase(updateActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Update Sessions
            .addCase(updateSessions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateSessions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSessionUpdated = true;
                state.message = "";
            })
            .addCase(updateSessions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Update Sessions
            .addCase(deleteActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDeleted = true;
                state.message = "";
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {addUpdateSessionState, resetSessionState, emptyActivityItem} = sessionSlice.actions
export default sessionSlice.reducer