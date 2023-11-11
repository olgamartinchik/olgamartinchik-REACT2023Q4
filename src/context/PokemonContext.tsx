import { createContext } from 'react';
import { Pokemon } from '../types/pokemonTypes';

interface PokemonContext {
  countPages?: number | null;
  pokemon?: Pokemon[];
  loading?: boolean;
  updatePokemon?: (searchValue: string, page: string, limit: string) => void;
}
export const PokemonContext = createContext<PokemonContext>({
  countPages: null,
  pokemon: [],
  loading: false,
  updatePokemon: () => {},
});
