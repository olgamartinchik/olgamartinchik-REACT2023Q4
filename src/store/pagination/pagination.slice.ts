import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PAGINATION_SLICE = 'PaginationState';
interface PaginationState {
  currentPage: number;
  limitPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  limitPage: 20,
};

const paginationSlice = createSlice({
  name: PAGINATION_SLICE,
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimitPage(state, action: PayloadAction<number>) {
      state.limitPage = action.payload;
    },
  },
});

export const { setCurrentPage, setLimitPage } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
