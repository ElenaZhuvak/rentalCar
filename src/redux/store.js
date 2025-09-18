import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { carsReducer } from '../redux/cars/carsSlice.js'
import { filtersReducer } from './filters/filtersSlice.js'

const filtersPersistConfig = {
  key: 'filters',
  version: 1,
  storage,
}

const rootReducer = {
  cars: carsReducer,
  filters: persistReducer(filtersPersistConfig, filtersReducer),
}


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);