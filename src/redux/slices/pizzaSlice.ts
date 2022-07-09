import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Pizza = {
  id: string;
  name: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
  raintig: number;
};

interface PizzaSliceState {
  items: Pizza[];
  status: string;
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

type fetchPizzasProps = {
  order: string;
  sortBy: string;
  category: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: fetchPizzasProps) => {
    const { order, sortBy, category } = params;
    const { data } = await axios.get(
      `https://6290c0cf27f4ba1c65c0f6cc.mockapi.io/coffee?${category}&sortBy=${sortBy}&order=${order}`,
    );
    return data as Pizza[];
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending.toString()]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled.toString()]: (state, action) => {
      state.items = action.payload;
      state.status = 'succses';
    },
    [fetchPizzas.rejected.toString()]: (state) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
