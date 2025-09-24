import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCars } from "../../services/api.js";

const LIMIT = 12;

export const fetchCarsThunk = createAsyncThunk(
  'cars/fetchCars',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState();
      const data = await fetchCars({ page: 1, limit: LIMIT, ...filters });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchMoreCarsThunk = createAsyncThunk(
  'cars/fetchMore',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const nextPage = state.cars.page + 1;
      const data = await fetchCars({ page: nextPage, limit: LIMIT, ...state.filters });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);