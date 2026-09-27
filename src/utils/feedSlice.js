import { createSlice } from "@reduxjs/toolkit";


const FeedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => {
            return state.filter(
                (user) => user._id !== action.payload
            );
        },
    },
})

export const { addFeed, removeFeed } = FeedSlice.actions;

export default FeedSlice.reducer;
