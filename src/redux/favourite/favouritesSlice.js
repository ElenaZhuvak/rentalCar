import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idFav: [],
};

const favouritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      if (!state.idFav.includes(action.payload)) {
        state.idFav.push(action.payload);
      }
    },
    removeFromFavorites(state, action) {
      state.idFav = state.idFav.filter(id => id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favouritesSlice.actions;
export const favoritesReducer = favouritesSlice.reducer;
