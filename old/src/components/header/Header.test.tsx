import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { renderWithProviders } from '../../test/test-utils';

describe('Header Component', () => {
  // beforeEach(() => {
  //   localStorage.clear();
  // });

  it('saves entered value to local storage on button click', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'pikachu');

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(localStorage.getItem('searchValue')).toBe('pikachu');
    });
  });

  it('retrieves the value from local storage upon mounting', async () => {
    localStorage.setItem('searchValue', 'charmander');

    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      {
        preloadedState: {
          search: {
            searchValue: localStorage.getItem('searchValue') || '',
            isLoading: false,
          },
        },
      }
    );

    await waitFor(() => {
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('charmander');
    });
  });
});
