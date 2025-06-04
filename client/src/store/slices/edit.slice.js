import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: { edit: false },
  reducers: {
    setEdit(state, action) {
      state.edit = !state.edit;
    },
  },
});

// Export the actions and the reducer
export const { setEdit: setEditAction } = editSlice.actions;
export default editSlice.reducer;
