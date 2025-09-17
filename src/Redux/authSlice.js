import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authSlice = createSlice({
  initialState: {
    name: 'gorgo',
    login: {},
    data: 123,
  },
  name: 'auth',
  reducers: {
    authLogin: (state, action) => {
      state.login = action.payload;
    },
    authLogout: (state, action) => {
      state.login = {};
    },
  },
});
const persistConfigue = {
  key: 'root',
  storage: AsyncStorage,
};

export const authreducer = persistReducer(persistConfigue, authSlice.reducer);
export const authActions = authSlice.actions;
export const {authLogin,authLogout} = authSlice.actions;
