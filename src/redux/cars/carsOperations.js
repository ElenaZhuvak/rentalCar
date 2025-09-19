// redux/cars/carsOperations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars } from '../../services/api';

const LIMIT = 12;

export const fetchCarsThunk = createAsyncThunk(
  'cars/fetchCars',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState();                  
      const data = await fetchCars({ page: 1, limit: LIMIT, ...filters });
      return data;                                      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMoreCarsThunk = createAsyncThunk(
  'cars/fetchMore',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const nextPage = state.cars.page + 1;
    try {
      const data = await fetchCars({ page: nextPage, limit: LIMIT, ...state.filters });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
