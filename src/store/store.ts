import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { pokemonApi } from './pokemon/pokemon.service';
import { paginationReducer } from './pagination/pagination.slice';
import { searchValueReducer } from './search/search.slice';

const rootReducer = combineReducers({
  pagination: paginationReducer,
  search: searchValueReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(pokemonApi.middleware as Middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
