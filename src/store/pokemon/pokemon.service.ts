import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../helpers/api.helper';
import { Pokemon, PokemonData, PokemonResultData } from './pokemon.models';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
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

export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi;
