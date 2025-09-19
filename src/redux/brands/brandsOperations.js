import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBrands } from "../../services/api.js";

export const fetchBrandsThunk = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchBrands();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



