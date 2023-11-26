import { delay, http, HttpResponse } from 'msw';
import { pokemonMock } from './pokemon_mock';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/', async () => {
    await delay(150);
    return HttpResponse.json({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/24/' },
      ],
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', async () => {
    await delay(150);
    return HttpResponse.json(pokemonMock[0]);
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', async () => {
    await delay(50);
    return HttpResponse.json(pokemonMock[2]);
  }),
];
