import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

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
        }
    }
});

export const { addBug, resolveBug } = bugSlice.actions;
export default bugSlice.reducer;
