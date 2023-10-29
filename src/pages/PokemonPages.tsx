import React, { Key, useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { CardContainer } from '../components/card/CardContainer';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

export interface PokemonAbility {
  ability: { name: string; url: string };
}
interface PokemonSprites {
  back_default: string;
  other: {
    dream_world: {
      front_default: string;
    };
  };
}
export interface Pokemon {
  id: Key;
  name: string;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
}
interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: PokemonResultData[];
}

interface PokemonResultData {
  name: string;
  url: string;
}
export const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const localSearchQuery = localStorage.getItem('searchValue') as string;
    const searchQuery = localSearchQuery ? localSearchQuery : '';
    getPokemon(searchQuery);
  }, []);

  if (error) {
    throw new Error(error);
  }

  const fetchData = async (
    searchQuery: string
  ): Promise<PokemonData | Pokemon | void> => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const URL = searchQuery
      ? `${baseUrl}${searchQuery}`
      : `${baseUrl}?offset=20&limit=20`;

    try {
      const res = await fetch(URL);

      if (res.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data: PokemonData = await res.json();
      return data;
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleData = async (
    data: PokemonData | Pokemon,
    value: string
  ): Promise<Pokemon[] | undefined> => {
    if (!data) {
      throw new Error(
        `Pokemon ${value.toUpperCase()} was not found! Please, reload page.`
      );
    }
    if ((data as PokemonData).results) {
      const results = (data as PokemonData).results;

      return Promise.all(
        results.map(async (result: { url: string }) => {
          const res = await fetch(result.url);
          return res.json();
        })
      );
    } else if ((data as Pokemon).name) {
      return [data as Pokemon];
    }
  };

  const handleError = (error: Error) => {
    console.error('Error on PokemonPage:', error);
    setLoading(false);
    setError(error.message);
  };

  const getPokemon = async (value: string) => {
    try {
      const data = (await fetchData(value)) as PokemonData | Pokemon;

      const pokemon = await handleData(data, value);
      setLoading(false);
      setError(null);
      setPokemon(pokemon!);

      if (pokemon && pokemon?.length !== 0) {
        localStorage.setItem('searchValue', value);
      } else {
        localStorage.removeItem('searchValue');
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const updatePokemon = (searchValue: string) => {
    getPokemon(searchValue);
  };
  return (
    <>
      <Header updatePokemon={updatePokemon} />

      <ErrorBoundary>
        <CardContainer pokemon={pokemon} loading={loading} />
      </ErrorBoundary>
    </>
  );
};
