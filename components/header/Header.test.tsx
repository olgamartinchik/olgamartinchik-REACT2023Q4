import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import Header from './Header';
import { vi } from 'vitest';

describe('Header Component', () => {
  vi.mock('next/router', () => require('next-router-mock'));

  it('saves entered value to local storage on button click', async () => {
    renderWithProviders(<Header />);

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
      <Header />,

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
