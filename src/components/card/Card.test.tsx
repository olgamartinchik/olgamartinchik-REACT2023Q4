import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Card } from './Card';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../../test/test-utils';

import { pokemonMock } from '../../mocks/pokemon_mock';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { PokemonPage } from '../../pages/PokemonPages';
import { CardContainer } from './CardContainer';
import { Details } from '../details/Details';

const mockCardData = pokemonMock[0];
const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', async () => {
    await delay(150);
    return HttpResponse.json(mockCardData);
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/', async () => {
    await delay(150);
    return HttpResponse.json([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/24/' },
    ]);
  }),
];
const server = setupServer(...handlers);
describe('Card Component', () => {
  // beforeAll(() => {
  //   server.listen();
  // });

  // afterEach(() => {
  //   server.resetHandlers();
  // });

  // afterAll(() => server.close());

  it('Render the card with relevant data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Card name="pikachu" />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      screen.debug();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
      );

      expect(screen.getByText('static')).toBeInTheDocument();
      expect(screen.getByText('lightning-rod')).toBeInTheDocument();
    });
  });

  it('Clicking on a card opens a detailed card component', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?offset=1&limit=3']}>
        <CardContainer />
        <Details />
      </MemoryRouter>
    );
    await waitFor(() => {
      const card = screen.queryByText('spearow');
      if (card) {
        userEvent.click(card);
      }
    });
    await waitFor(() => {
      screen.debug();
      expect(screen.queryByText('Loading details...')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  it('triggers an additional API call on card click', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Card name="pikachu" />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      const user = userEvent.setup();

      userEvent.click(screen.getByText('pikachu'));

      const spyAnchorTag = vi.spyOn(user, 'click');
      user.click(screen.getByText('pikachu'));

      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
    });
  });
});
