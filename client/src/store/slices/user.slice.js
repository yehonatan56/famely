import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    updateImages(state, action) {
      state.user.famely.images = action.payload;
    },
    updateMembers(state, action) {
      state.user.famely.members = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
    },
  },
});

// Export the actions and the reducer
export const { setUser: setUserAction, removeUser: removeUserAction, updateImages: updateImagesAction, updateMembers: updateMembersAction } =
  userSlice.actions;
export default userSlice.reducer;
