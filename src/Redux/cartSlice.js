import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    foodCart: [],
    cartItems: 10,
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
        state.foodCart[productIndex].quant > 1 &&
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
      if (productIndex === -1) {
        state.foodCart.push(product);
      } else {
        state.foodCart[productIndex].quant++;
        state.foodCart[productIndex].subtotal =
          state.foodCart[productIndex].price *
          state.foodCart[productIndex].quant;
      }
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
