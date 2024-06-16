import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
    name: "images",
    initialState: { images: null },
    reducers: {
        pushImages(state, action) {
            state.images = action.payload.images; // Correctly update the images property
        },
    }
});

// Correct the selector
export const selectImages = (state) => state.images;

// Export the actions and the reducer
export const { pushImages } = imagesSlice.actions;
export default imagesSlice.reducer;
