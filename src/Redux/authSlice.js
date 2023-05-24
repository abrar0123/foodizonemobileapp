import {createSlice} from '@reduxjs/toolkit';

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

export const authreducer = authSlice.reducer;
export const authActions = authSlice.actions;
