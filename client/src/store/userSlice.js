import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { user: null },
    reducers: {
        pushUser(state, action) {
            state.user = action.payload.user; // Correctly update the user property
        },
    }
});

// Correct the selector
export const selectUser = (state) => state.user;

// Export the actions and the reducer
export const { pushUser } = userSlice.actions;
export default userSlice.reducer;
