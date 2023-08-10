import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import {authreducer} from '../authSlice';
import persistStore from 'redux-persist/es/persistStore';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import {foodApiReducer} from '../foodapiSlice';
import {cartReducer} from '../cartSlice';
import {foodProductsApi} from '../rtxQuery/apiSliceProducts';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

const rootReducer = combineReducers({
  auth: authreducer,
  cart: cartReducer,
  foodapi: foodApiReducer,
  // [foodProductsApi.reducerPath]: foodProductsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // getDefaultMiddleware().concatt()
    }),
});
// setupListeners(store.dispatch);
export const persiststore = persistStore(store);
