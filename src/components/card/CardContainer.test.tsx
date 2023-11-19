import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { CardContainer } from './CardContainer';
import { renderWithProviders } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { Header } from '../header/Header';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { Card } from './Card';
import { pokemonDataMock } from '../../mocks/pokemon_mock';

const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/', async () => {
    await delay(150);
    return HttpResponse.json(pokemonDataMock);
  }),
];
const server = setupServer(...handlers);
describe('CardContainer Component', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());
  test('Renders the specified number of cards', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?offset=1&limit=3']}>
        <CardContainer />
        {pokemonDataMock.map((data) => (
          <Card key={data.name} name={data.name} />
        ))}
      </MemoryRouter>
    );
    await waitFor(() => {});

    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(3);
    });
  });

  test('Displays an appropriate message if no cards are present', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?offset=1&limit=3']}>
        <Header />
        <CardContainer />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'pikachu123');
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeInTheDocument();
    });
    await waitFor(() => {});
    await waitFor(() => {
      const noCardsMessage = screen.queryByText(
        /Pokemon PIKACHU123 was not found!/i
      );
      expect(noCardsMessage).toBeInTheDocument();
    });
  });
});
