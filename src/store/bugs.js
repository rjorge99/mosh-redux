import { createSlice, createSelector, creatActions } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from './api';

let id = 0;
const bugSlice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (bugs) => {
            bugs.loading = true;
        },
        bugsRequestFailed: (bugs) => {
            bugs.loading = true;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        bugAdded: (bugs, action) => {
            console.log('action', action);
            bugs.list.push(action.payload);
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
        bugAssigned: (bugs, action) => {
            const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
            bugs.list[index].userId = action.payload.userId;
        }
    }
});

export const {
    bugAdded,
    bugResolved,
    bugAssigned,
    bugsReceived,
    bugsRequested,
    bugsRequestFailed
} = bugSlice.actions;
export default bugSlice.reducer;

//Action Creators
const url = '/bugs';
export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;
    const diffMinutes = moment().diff(lastFetch, 'minutes');
    if (diffMinutes < 10) return;

    dispatch(
        apiCallBegan({
            url,
            onSuccess: bugsReceived.type,
            onStart: bugsRequested.type,
            onError: bugsRequestFailed.type
        })
    );
};

export const addBug = (bug) =>
    apiCallBegan({
        url,
        method: 'POST',
        data: bug,
        onSuccess: bugAdded.type
    });

export const resolveBug = (id) =>
    apiCallBegan({
        url: `${url}/${id}`,
        method: 'patch',
        data: { resolved: true },
        onSuccess: bugResolved.type
    });

export const assignBugToUser = (bugId, userId) =>
    apiCallBegan({
        url: `${url}/${bugId}`,
        method: 'patch',
        data: { userId },
        onSuccess: bugAssigned.type
    });

//Selector
// export const getUnresolvedBugs = (state) => state.entities.bugs.filter((bug) => !bug.resolved);
export const getUnresolvedBugs = createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((b) => !b.resolved)
);

//Nota: createSelector regresa una funcion
export const getBugsByUserId = (userId) =>
    createSelector(
        (state) => state.entities.bugs,
        (bugs) => bugs.filter((b) => b.userId === userId)
    );
