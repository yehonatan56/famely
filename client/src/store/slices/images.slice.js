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



// Export the actions and the reducer
export const { pushImages: setImagesAction } = imagesSlice.actions;
export default imagesSlice.reducer;
