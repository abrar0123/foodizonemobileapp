import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import {authreducer} from '../authSlice';
import persistStore from 'redux-persist/es/persistStore';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const rootReducer = combineReducers({
  auth: authreducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persiststore = persistStore(store);
