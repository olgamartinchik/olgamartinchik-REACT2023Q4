import { screen, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import { pokemonMock } from '../../mocks/pokemon_mock';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { PokemonPage } from '../../pages/PokemonPages';

const mockCardData = pokemonMock[0];
const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', async () => {
    await delay(150);
    return HttpResponse.json(mockCardData);
  }),
];
const server = setupServer(...handlers);
describe('Details Component', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('Check loader', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/pikachu']}>
        <PokemonPage />
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading details.../)).toBeInTheDocument();
    });
  });
  it('hides the component when clicking the close button', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/pikachu']}>
        <PokemonPage />
        <Details />
      </MemoryRouter>
    );

    const closeButton = screen.queryByText('Close');
    await waitFor(() => {
      if (closeButton) {
        userEvent.click(closeButton);
      }
    });

    await waitFor(() => {
      expect(closeButton).toBeNull();
    });
  });

  it('correctly displays detailed card data', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/pikachu']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
      );

      expect(screen.queryByText('Close')).toBeInTheDocument();
    });
  });
});
