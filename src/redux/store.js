import { configureStore } from "@reduxjs/toolkit";
import { hotelReducer } from "./reducer/hotelReducer";

export const store = configureStore({
    reducer: {
        hotelReducer,

    }
})