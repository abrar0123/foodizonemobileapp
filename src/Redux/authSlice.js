import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginEmail: '',
    loggedInCredential: {},
  },
  reducers: {
    login: (state, action) => {
      const {loggedIn} = action.payload;
      console.log('loggedIn__mycode123\n:', loggedIn);
      state.loginEmail = loggedIn.email;
      state.loggedInCredential = loggedIn;
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
