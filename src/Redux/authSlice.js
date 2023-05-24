import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginEmail: '',
  },
  reducers: {
    login: (state, action) => {
      const {email} = action.payload;
      //   const {pass} = action.payload;
      state.loginEmail = email;
      //   state.login.pass = pass;
    },
  },
});
const persistConfigue = {
  key: 'root',
  storage: AsyncStorage,
};

export const authreducer = persistReducer(persistConfigue, authSlice.reducer);
export const authActions = authSlice.actions;
