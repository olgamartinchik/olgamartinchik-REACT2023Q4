import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('Updates URL query parameter when page changes', () => {
    render(
      <BrowserRouter>
        <PokemonContext.Provider
          value={{ updatePokemon: vi.fn(), countPages: 5, loading: false }}
        >
          <Pagination />
        </PokemonContext.Provider>
      </BrowserRouter>
    );

    expect(window.location.search).toBe('?offset=1&limit=20');

    fireEvent.click(screen.getByText('➡️'));

    expect(window.location.search).toBe('?offset=2&limit=20');
  });
});
