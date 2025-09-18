import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCars } from "./carsOperations.js";
import { clearFilters, setFilters } from "../filters/filtersSlice.js";

const initialState = {
  cars: [],
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars', 
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null; 
    })
    .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      } )
      .addCase(fetchCars.rejected, (state, action) => {
          state.loading = false;
          state.error =action.payload || action.error.message; 
        })
        .addMatcher(isAnyOf(setFilters, clearFilters), (state) => {
            state.cars = [];
            state.error = null;
        })
    },
});

export const carsReducer = carsSlice.reducer;