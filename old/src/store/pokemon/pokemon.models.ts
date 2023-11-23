export interface PokemonAbility {
  ability: { name: string; url?: string };
}
export interface PokemonSprites {
  back_default: string;
  other: {
    dream_world: {
      front_default: string;
    };
  };
}
export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
}
export interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: PokemonResultData[];
}

export interface PokemonResultData {
  name: string;
  url: string;
}
