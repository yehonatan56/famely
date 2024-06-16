import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
    },
  },
});

// Export the actions and the reducer
export const { setUser: setUserAction, removeUser: removeUserAction } =
  userSlice.actions;
export default userSlice.reducer;
