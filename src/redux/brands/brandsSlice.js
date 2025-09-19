import { createSlice } from '@reduxjs/toolkit';
import { fetchBrandsThunk } from './brandsOperations.js';

const initialState = {
  brands: [],
  loading: false,
  error: null,
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchBrandsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandsThunk.fulfilled, (state, action) => {
        state.brands = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchBrandsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const brandsReducer = brandsSlice.reducer;