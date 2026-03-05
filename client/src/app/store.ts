import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage use karenge
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';
import productReducer from '../features/product/productSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Sirf login data save rahega refresh par
};

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  product:productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;