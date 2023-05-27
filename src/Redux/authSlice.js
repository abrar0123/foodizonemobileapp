import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginEmail: '',
    password: '',
    username: '',
  },
  reducers: {
    login: (state, action) => {
      const {email} = action.payload;
      const {password} = action.payload;
      const {username} = action.payload;

      //   const {pass} = action.payload;
      state.loginEmail = email;
      state.password = password;
      state.username = username;

      //   state.login.pass = pass;
    },
    logout: state => {
      state.loginEmail = null;
      state.password = null;
      state.username = null;

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
