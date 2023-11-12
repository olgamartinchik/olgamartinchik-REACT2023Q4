import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';
import Header from './Header';

describe('Header Component', () => {
  it('saves entered value to local storage on button click', async () => {
    render(
      <BrowserRouter>
        <PokemonContext.Provider
          value={{ updatePokemon: vi.fn(), countPages: 5, loading: false }}
        >
          <Header />
        </PokemonContext.Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'pikachu');

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    waitFor(() => {
      expect(localStorage.getItem('searchValue')).toBe('pikachu');
    });
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('searchValue', 'charmander');

    render(
      <BrowserRouter>
        <PokemonContext.Provider
          value={{ updatePokemon: vi.fn(), countPages: 5, loading: false }}
        >
          <Header />
        </PokemonContext.Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('charmander');
  });
});
