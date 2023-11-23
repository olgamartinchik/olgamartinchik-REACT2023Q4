import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { pokemonApi } from './pokemon/pokemon.service';
import { paginationReducer } from './pagination/pagination.slice';
import { searchValueReducer } from './search/search.slice';
import type { PreloadedState } from '@reduxjs/toolkit';
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  pagination: paginationReducer,
  search: searchValueReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

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

const makeStore: MakeStore<AppStore> = (context: Context) => setupStore();

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
