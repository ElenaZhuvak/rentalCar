import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { carsReducer } from '../redux/cars/carsSlice.js';
import { filtersReducer } from '../redux/filters/filtersSlice';
import { brandsReducer } from './brands/brandsSlice.js';
import { favoritesReducer } from './favourite/favouritesSlice.js';


const rootReducer = combineReducers({
  cars: carsReducer,  
  filters: filtersReducer,
  brands: brandsReducer,
  favorites: favoritesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
});

export const persistor = persistStore(store);
