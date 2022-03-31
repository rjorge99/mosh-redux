import { createSlice, createSelector, creatActions } from '@reduxjs/toolkit';
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
        addBug: (bugs, action) => {
            bugs.list.push({
                id: ++id,
                description: action.payload.description,
                resolved: false
            });
        },
        resolveBug: (bugs, action) => {
            const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
        bugAssigned: (bugs, action) => {
            const index = bugs.list.findIndex((bug) => bug.id === action.payload.bugId);
            bugs.list[index].userId = action.payload.userId;
        }
    }
});

export const { addBug, resolveBug, bugAssigned, bugsReceived, bugsRequested, bugsRequestFailed } = bugSlice.actions;
export default bugSlice.reducer;

//Action Creators
const url = '/bugs';
export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;
    console.log(lastFetch);
    dispatch(
        apiCallBegan({
            url,
            onSuccess: bugsReceived.type,
            onStart: bugsRequested.type,
            onError: bugsRequestFailed.type
        })
    );
};
// export const loadBugs = () => apiCallBegan({
//     url,
//     onSuccess: bugsReceived.type,
//     onStart: bugsRequested.type,
//     onError: bugsRequestFailed.type
// });

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
