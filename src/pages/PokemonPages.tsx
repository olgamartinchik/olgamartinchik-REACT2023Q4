import { useState } from 'react';
import Header from '../components/header/Header';
import { CardContainer } from '../components/card/CardContainer';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { PokemonContext } from '../context/PokemonContext';
import { Pagination } from '../components/Pagination/Pagination';
import { Pokemon, PokemonData } from '../types/pokemonTypes';

function isPokemonData(param: PokemonData | Pokemon): param is PokemonData {
  return (param as PokemonData).results !== undefined;
}

export const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [countPages, setCountPages] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

  if (error) {
    throw new Error(error);
  }

  const fetchData = async (
    searchQuery: string,
    page: string,
    limit: string
  ): Promise<PokemonData | Pokemon | void> => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const URL = searchQuery
      ? `${baseUrl}${searchQuery}`
      : `${baseUrl}?offset=${page}0&limit=${limit}`;

    try {
      const res = await fetch(URL);

      if (res.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
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
    if (isPokemonData(data)) {
      const results = data.results;
      setCountPages(data.count);
      return Promise.all(
        results.map(async (result: { url: string }) => {
          const res = await fetch(result.url);
          return res.json();
        })
      );
    } else {
      setCountPages(1);
      return [data];
    }
  };

  const handleError = (error: Error) => {
    console.error('Error on PokemonPage:', error);
    setLoading(false);
    setError(error.message);
  };

  const getPokemon = async (value: string, page: string, limit: string) => {
    try {
      const data = (await fetchData(value, page, limit)) as
        | PokemonData
        | Pokemon;

      const pokemon = await handleData(data, value);
      setLoading(false);
      setError(null);
      setPokemon(pokemon!);
      console.log('pokemon', pokemon);
      if (pokemon && pokemon?.length !== 0) {
        localStorage.setItem('searchValue', value);
        setSearchValue(value);
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const updatePokemon = (searchValue: string, page: string, limit: string) => {
    getPokemon(searchValue, page, limit);
  };
  return (
    <>
      <PokemonContext.Provider
        value={{ searchValue, countPages, pokemon, loading, updatePokemon }}
      >
        <Header />
        <ErrorBoundary>
          <CardContainer />
          <Pagination />
        </ErrorBoundary>
      </PokemonContext.Provider>
    </>
  );
};
