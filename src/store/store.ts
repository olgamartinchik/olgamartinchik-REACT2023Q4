import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { pokemonApi } from './pokemon/pokemon.service';
import { paginationReducer } from './pagination/pagination.slice';
import { searchValueReducer } from './search/search.slice';
import type { PreloadedState } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  pagination: paginationReducer,
  search: searchValueReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: true,
//     }).concat(pokemonApi.middleware as Middleware),
//   devTools: true,
// });
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
      }).concat(pokemonApi.middleware as Middleware),
    devTools: true,
  });
};
export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
