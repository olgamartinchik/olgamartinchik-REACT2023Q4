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
      console.error(error);
    }
  }

  async handleData(data: PokemonData | Pokemon) {
    console.log('data', data);
    if (data && (data as PokemonData).results) {
      const results = (data as PokemonData).results;

      const pokemon = await Promise.all(
        results.map(async (result: { url: string }) => {
          const res = await fetch(result.url);
          return res.json();
        })
      );

      this.setState({
        pokemon,
        loading: false,
        error: null,
      });
    } else if (data && (data as Pokemon).name) {
      console.log('data.name', (data as Pokemon).name);
      this.setState({
        pokemon: [data],
        loading: false,
        error: null,
      });
    } else {
      this.handleError(new Error(`Pokemon was not founded!`));
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
      this.handleData(data);
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
    return (
      <>
        <Header updatePokemon={this.updatePokemon} />
        {/* {this.state.error} */}
        <ErrorBoundary>
          <CardContainer {...this.state} />
        </ErrorBoundary>
      </>
    );
  }
}
export default PokemonPage;
