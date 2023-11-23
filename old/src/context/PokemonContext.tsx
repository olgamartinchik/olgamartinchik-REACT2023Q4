import { createContext } from 'react';
import { Pokemon } from '../store';

interface PokemonContext {
  searchValue?: string;
  countPages?: number | null;
  pokemon?: Pokemon[];
  loading?: boolean;
  updatePokemon?: (searchValue: string, page: string, limit: string) => void;
}
export const PokemonContext = createContext<PokemonContext>({
  searchValue: '',
  countPages: null,
  pokemon: [],
  loading: false,
  updatePokemon: () => {},
});
