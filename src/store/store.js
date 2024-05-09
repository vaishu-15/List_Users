import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:['user']
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };