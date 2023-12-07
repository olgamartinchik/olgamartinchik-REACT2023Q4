import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import countries from './countries';

const SEARCH_VALUE_SLICE = 'SearchState';
interface SearchState {
  countries: Array<string>;
  selectedCountry: string;
}

const initialState: SearchState = {
  countries,
  selectedCountry: '',
};

const searchValueSlice = createSlice({
  name: SEARCH_VALUE_SLICE,
  initialState,
  reducers: {
    selectCountry(state, action: PayloadAction<string>) {
      state.selectedCountry = action.payload;
    },
  },
});

export const { selectCountry } = searchValueSlice.actions;
export const searchValueReducer = searchValueSlice.reducer;
