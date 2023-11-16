import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SEARCH_VALUE_SLICE = 'SearchState';
interface PaginationState {
  searchValue: string;
}

const initialState: PaginationState = {
  searchValue: '',
};

const searchValueSlice = createSlice({
  name: SEARCH_VALUE_SLICE,
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;
export const searchValueReducer = searchValueSlice.reducer;
