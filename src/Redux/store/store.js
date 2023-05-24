import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import {authreducer} from '../authSlice';

const rootReducer = combineReducers({
  auth: authreducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
