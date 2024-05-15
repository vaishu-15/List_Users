import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import userReducer from './userSlice';

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'additionalData', 'updatedUserList'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

const persistor = persistStore(store);

export {store, persistor};