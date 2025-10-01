import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: null,
    price: null,
    minMileage: null,
    maxMileage: null,  
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action) {
            return { ...state, ...action.payload };
        },
        clearFilters() {
            return initialState;
        },
    },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;