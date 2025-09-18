import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCars as apiFetchCars} from "../../services/api.js";

const fetchCarsThunk = createAsyncThunk(
  'cars/fetchCars',
  async (filters, { rejectWithValue }) => {
    try {
      const data = await apiFetchCars(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
    }
);

export { fetchCarsThunk as fetchCars };