import { createSlice } from "@reduxjs/toolkit";


const FeedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        // eslint-disable-next-line no-unused-vars
        removeFeed: (state, action) => null
    },
})

export const { addFeed, removeFeed } = FeedSlice.actions;

export default FeedSlice.reducer;
