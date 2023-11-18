import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { CardContainer } from './CardContainer';
import { renderWithProviders } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { Header } from '../header/Header';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
const handlers = [
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
describe('CardContainer Component', () => {
  test('Renders the specified number of cards', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?offset=1&limit=3']}>
        <CardContainer />
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
    expect(screen.queryByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      const noCardsMessage = screen.queryByText(
        /Pokemon PIKACHU123 was not found!/i
      );
      expect(noCardsMessage).toBeInTheDocument();
    });
  });
});
