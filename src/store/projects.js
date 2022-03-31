import { createSlice } from '@reduxjs/toolkit';

let id = 0;
const projectsSlice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: {
        projectAdded: (projects, action) => {
            projects.push({
                id: ++id,
                name: action.payload.name
            });
        }
    }
});

export const { projectAdded } = projectsSlice.actions;
export default projectsSlice.reducer;
