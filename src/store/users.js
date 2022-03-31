import { createSlice } from '@reduxjs/toolkit';

let id = 0;
const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        userAdded: (users, action) => {
            users.push({
                id: ++id,
                name: action.payload.name
            });
        }
    }
});

export const { userAdded } = usersSlice.actions;
export default usersSlice.reducer;
