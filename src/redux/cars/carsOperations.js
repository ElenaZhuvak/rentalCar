import { fetchCars } from "../../services/api.js";

const fetchCarsThank = createAsyncThunk(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCars(filter);}