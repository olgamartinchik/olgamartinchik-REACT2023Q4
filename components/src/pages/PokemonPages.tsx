import React, { Key } from 'react';
import Header from '../components/header/Header';
import CardContainer from '../components/card/CardContainer';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

interface CardContainerState {
  pokemon: Pokemon[];
  loading: boolean;
  error: null | string;
}
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

class PokemonPage extends React.Component {
  state: CardContainerState = {
    pokemon: [],
    loading: true,
    error: null,
  };
  async fetchData(searchQuery: string): Promise<PokemonData | Pokemon | void> {
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
      this.handleError(error as Error);
    }
  }

  async handleData(
    data: PokemonData | Pokemon,
    value: string
  ): Promise<Pokemon[] | undefined> {
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
  }

  handleError(error: Error) {
    console.error('Error on PokemonPage:', error);
    this.setState({
      loading: false,
      error: error.message,
    });
  }

  async getPokemon(value: string) {
    try {
      const data = (await this.fetchData(value)) as PokemonData | Pokemon;

      const pokemon = await this.handleData(data, value);
      this.setState({
        pokemon,
        loading: false,
        error: null,
      });
      if (pokemon && pokemon?.length !== 0) {
        localStorage.setItem('searchValue', value);
      } else {
        localStorage.removeItem('searchValue');
      }
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  componentDidMount() {
    const localSearchQuery = localStorage.getItem('searchValue') as string;
    const searchQuery = localSearchQuery ? localSearchQuery : '';
    this.getPokemon(searchQuery);
  }

  updatePokemon = (searchValue: string) => {
    this.getPokemon(searchValue);
  };

  render() {
    if (this.state.error) {
      throw new Error(this.state.error);
    }

    return (
      <>
        <Header updatePokemon={this.updatePokemon} />

        <ErrorBoundary>
          <CardContainer {...this.state} />
        </ErrorBoundary>
      </>
    );
  }
}
export default PokemonPage;
