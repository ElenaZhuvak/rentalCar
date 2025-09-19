import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCarsThunk, fetchMoreCarsThunk } from './carsOperations.js';
import { clearFilters, setFilters } from '../filters/filtersSlice.js';

const initialState = {
  cars: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCarsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        const { cars = [], page =1, totalPages = 1 } = action.payload || {};
        state.cars = cars;
        state.page = Number(page) || 1;
        state.totalPages = Number(totalPages) || 1;
        state.loading = false;
      })
      .addCase(fetchCarsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMoreCarsThunk.fulfilled, (state, action) => {
        const { cars = [], page, totalPages } = action.payload || {};
        state.cars = state.cars.concat(cars);
        if (page != null) state.page = Number(page) || state.page;
        if (totalPages != null) state.totalPages = Number(totalPages) || state.totalPages;
        state.loading = false;
      })
      .addMatcher(isAnyOf(setFilters, clearFilters), state => {
        state.cars = [];
        state.page = 1;
        state.totalPages = 1;
        state.error = null; 
      })
    },
});

export const carsReducer = carsSlice.reducer;
