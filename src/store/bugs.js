import { createAction, createReducer } from '@reduxjs/toolkit';

// Action Creators
export const addBug = createAction('addBug');
export const removeBug = createAction('removeBug');
export const resolveBug = createAction('resolveBug');

let id = 0;
export default createReducer([], {
    [addBug.type]: (bugs, action) => {
        bugs.push({
            id: ++id,
            description: action.payload,
            resolved: false
        });
    },
    [resolveBug.type]: (bugs, action) => {
        const index = bugs.findIndex((bug) => bug.id === action.payload.id);
        bugs[index].resolved = true;
    }
});
