import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormType } from './form.model';

const FORM_VALUE_SLICE = 'FormState';

type ImgFile = string | ArrayBuffer | null;
interface FormState {
  reactForm: FormType;
  reactHookForm: FormType;
  isLoadingReactForm: boolean;
  isLoadingReactHookForm: boolean;
}

const initialState: FormState = {
  reactForm: {} as FormType,
  reactHookForm: {} as FormType,
  isLoadingReactForm: false,
  isLoadingReactHookForm: false,
};

const formValueSlice = createSlice({
  name: FORM_VALUE_SLICE,
  initialState,
  reducers: {
    setReactForm(state, action: PayloadAction<FormType>) {
      state.reactForm = action.payload;
    },
    setReactHookForm(state, action: PayloadAction<FormType>) {
      state.reactHookForm = action.payload;
    },

    setReactHookFormLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingReactHookForm = action.payload;
    },
    setReactFormLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingReactForm = action.payload;
    },
  },
});

export const {
  setReactForm,
  setReactHookForm,
  setReactHookFormLoading,
  setReactFormLoading,
} = formValueSlice.actions;
export const formValueReducer = formValueSlice.reducer;
