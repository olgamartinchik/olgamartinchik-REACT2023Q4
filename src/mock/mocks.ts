import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { pokemonMock } from './pokemon_mock';

export const worker = setupWorker(
  http.get('https://pokeapi.co/api/v2/pokemon//pikachu', () =>
    HttpResponse.json(pokemonMock[0])
  )
);
