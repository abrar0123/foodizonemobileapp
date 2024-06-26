import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    foodCart: [],
    cartItems: 10,
    userOrderID: '',
    profilePic: '',
  },

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      console.log(product);
      let productIndex = state.foodCart.findIndex(
        item => item.id === product.id,
      );
      if (productIndex === -1) {
        state.foodCart.push(product);
      } else {
        state.foodCart[productIndex].quant++;
        state.foodCart[productIndex].subtotal =
          state.foodCart[productIndex].price *
          state.foodCart[productIndex].quant;
      }
    },
    removeToCart: (state, action) => {
      const product = action.payload;
      console.log(product);
      let productIndex = state.foodCart.findIndex(
        item => item.id === product.id,
      );
      if (productIndex !== -1) {
        state.foodCart[productIndex].quant > 0 &&
          state.foodCart[productIndex].quant--;
        state.foodCart[productIndex].subtotal =
          state.foodCart[productIndex].price *
          state.foodCart[productIndex].quant;
      }
    },
    deleteProduct: (state, action) => {
      const product = action.payload;
      console.log(product);
      let productIndex = state.foodCart.findIndex(
        item => item.id === product.id,
      );
      if (productIndex !== -1) {
        state.foodCart.splice(productIndex, 1);
      }
    },
    removeFullCart: (state, action) => {
      state.foodCart = [];
    },
    placedOrder: (state, actions) => {
      const {orderID} = actions.payload;
      console.log('current_Order :----\n', orderID);
      state.userOrderID = orderID;
    },
    profilepicSave: (state, actions) => {
      const {profile} = actions.payload;
      state.profilePic = profile;
    },
  },
});

const persistconfigue = {
  key: 'root',
  storage: AsyncStorage,
};
export const cartReducer = persistReducer(persistconfigue, cartSlice.reducer);

// export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
