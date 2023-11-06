import { createContext } from 'react';
import { Pokemon } from '../pages/PokemonPages';

export const PokemonContext = createContext<Pokemon[] | []>([]);
