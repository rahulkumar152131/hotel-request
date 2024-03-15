import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
    data: null,
    isLoading: false,
    success: false,
    errors: null,
}


// Async thunk for fetching hotel data
export const gethotelAsync = createAsyncThunk("hotel/get-details",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://checkinn.co/api/v1/int/requests');
            // console.log(response);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data || [{ msg: "server not responding" }]);
        }
    }
);


// Redux slice for managing hotel state
const hotellice = createSlice({
    name: "hotel",
    initialState: INITIAL_STATE,
    reducers: {
        setMonth: (state, action) => {
            state.month = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Reducer for handling successful completion of gethotelAsync
        builder.addCase(gethotelAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            // console.log(action.payload);
            state.data = action.payload.requests;
        })
            // Reducer for handling pending state of gethotelAsync
            .addCase(gethotelAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            // Reducer for handling rejected state of gethotelAsync
            .addCase(gethotelAsync.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
});

// Selector to get the hotel state
export const hotelSelector = (state) => state.hotelReducer;

// Actions exported from the slice
export const hotelActions = hotellice.actions;

// Reducer exported from the slice
export const hotelReducer = hotellice.reducer;
