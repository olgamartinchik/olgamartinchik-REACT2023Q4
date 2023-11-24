import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonData, PokemonResultData } from './pokemon.models';
import { baseUrl } from '@/helpers/api.helper';
import { HYDRATE } from 'next-redux-wrapper';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      console.log('HYDRATE', action.payload);
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),

    getPokemonList: builder.query<
      PokemonResultData[],
      { page: string; limit: string }
    >({
      query: ({ page, limit }) => `pokemon/?offset=${page}0&limit=${limit}`,
      transformResponse: (response: PokemonData) => response.results,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;

export const { getPokemonByName, getPokemonList } = pokemonApi.endpoints;
