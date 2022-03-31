import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let id = 0;
const bugSlice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        addBug: (bugs, action) => {
            bugs.push({
                id: ++id,
                description: action.payload.description,
                resolved: false
            });
        },
        resolveBug: (bugs, action) => {
            const index = bugs.findIndex((bug) => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },
        bugAssigned: (bugs, action) => {
            const index = bugs.findIndex((bug) => bug.id === action.payload.bugId);
            bugs[index].userId = action.payload.userId;
        }
    }
});

export const { addBug, resolveBug, bugAssigned } = bugSlice.actions;
export default bugSlice.reducer;

//Selector
// export const getUnresolvedBugs = (state) => state.entities.bugs.filter((bug) => !bug.resolved);
export const getUnresolvedBugs = createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((b) => !b.resolved)
);

export const getBugsByUserId = (userId) =>
    createSelector(
        (state) => state.entities.bugs,
        (bugs) => bugs.filter((b) => b.userId === userId)
    );
