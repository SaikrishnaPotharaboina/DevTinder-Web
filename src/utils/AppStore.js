import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from './feedSlice'
import ConnectionReducer from './connectionSlice'
import RequestReducer from './requestSlice'


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: ConnectionReducer,
        request: RequestReducer,
    },
})

export default appStore;
