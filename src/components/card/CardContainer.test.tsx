import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardContainer } from './CardContainer';
import { pokemonMock, pokemonDataMock } from '../../mock/pokemon_mock';
import { PokemonContext } from '../../context/PokemonContext';

describe('CardContainer Component', () => {
  test('Renders the specified number of cards', async () => {
    render(
      <BrowserRouter>
        <PokemonContext.Provider
          value={{
            pokemon: pokemonMock,
            loading: false,
            countPages: pokemonDataMock.count,
            updatePokemon: () => {},
          }}
        >
          <CardContainer />
        </PokemonContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(2);
    });
  });

  test('Displays an appropriate message if no cards are present', async () => {
    render(
      <BrowserRouter>
        <PokemonContext.Provider
          value={{
            pokemon: [],
            loading: false,
            countPages: 1,
            updatePokemon: () => {},
          }}
        >
          <CardContainer />
        </PokemonContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const noCardsMessage = screen.getByText('Pokemon were not found');
      expect(noCardsMessage).toBeInTheDocument();
    });
  });
});
