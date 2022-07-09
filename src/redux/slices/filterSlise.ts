import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  name: string;
  sort: string;
};

interface FilterSliceState {
  activeCategory: number;
  activeSort: Sort;
}

const initialState: FilterSliceState = {
  activeCategory: 0,
  activeSort: {
    name: 'популярности',
    sort: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action: PayloadAction<Sort>) {
      state.activeSort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.activeSort = action.payload.activeSort;
    },
  },
});

export const { setActiveCategory, setActiveSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
