import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SEARCH_VALUE_SLICE = 'SearchState';
interface SearchState {
  searchValue: string;
  isLoading: boolean;
}

const initialState: SearchState = {
  searchValue: localStorage.getItem('searchValue') || '',
  isLoading: false,
};

const searchValueSlice = createSlice({
  name: SEARCH_VALUE_SLICE,
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSearchLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setSearchValue, setSearchLoading } = searchValueSlice.actions;
export const searchValueReducer = searchValueSlice.reducer;
