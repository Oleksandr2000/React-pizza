import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getLocalStoregeCart } from '../../utils/getLocalStoregeCart';

export type CartItem = {
  id: string;
  name: string;
  imageUrl: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  products: CartItem[];
}

const { products, totalPrice } = getLocalStoregeCart();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  products: products,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findItem = state.products.find((obj: CartItem) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.products);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.products.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = calcTotalPrice(state.products);
      } else {
        state.products = state.products.filter((obj) => obj.id !== action.payload);
        state.totalPrice = calcTotalPrice(state.products);
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.products);
    },
    clearProduct(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, clearProduct, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
