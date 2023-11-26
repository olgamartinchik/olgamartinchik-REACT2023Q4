import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { START_LIMIT, START_PAGE } from '../../constants/countPage';

const PAGINATION_SLICE = 'PaginationState';
interface PaginationState {
  currentPage: number;
  limitPage: number;
  isLoading: boolean;
}

const initialState: PaginationState = {
  currentPage: START_PAGE,
  limitPage: START_LIMIT,
  isLoading: false,
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
    setPaginationLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentPage, setLimitPage, setPaginationLoading } =
  paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
