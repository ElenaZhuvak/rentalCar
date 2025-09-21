import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCars } from "../../services/api.js";

const LIMIT = 12;

export const fetchCarsThunk = createAsyncThunk(
  'cars/fetchCars',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState(); // Получаем фильтры из Redux
      const data = await fetchCars({ page: 1, limit: LIMIT, ...filters }); // Передаем фильтры на сервер
      return data; // Сервер возвращает уже отфильтрованные данные
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
      const nextPage = state.cars.page + 1; // Запрашиваем следующую страницу
      const data = await fetchCars({ page: nextPage, limit: LIMIT, ...state.filters }); // Передаем фильтры на сервер
      return data; // Сервер возвращает уже отфильтрованные данные
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);