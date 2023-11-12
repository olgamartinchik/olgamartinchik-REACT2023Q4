import { render, screen, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import { pokemonMock } from '../../mock/pokemon_mock';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');
const mockCardData = pokemonMock[0];

describe('Details Component', () => {
  it('hides the component when clicking the close button', async () => {
    const promise = Promise.resolve({ data: { hits: mockCardData } });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);
    render(
      <MemoryRouter initialEntries={['/details/25?frontpage=1&detail=pikachu']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    waitFor(() => promise);
    const user = userEvent.setup();

    await user.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
    });
  });
  it('correctly displays detailed card data', async () => {
    const promise = Promise.resolve({ data: { hits: mockCardData } });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);
    render(
      <MemoryRouter initialEntries={['/details/25?frontpage=1&detail=pikachu']}>
        <Details />
      </MemoryRouter>
    );
    waitFor(() => promise);

    waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();

      expect(screen.getByText('static')).toBeInTheDocument();
    });
  });

  it('hides the component when clicking the close button', async () => {
    render(
      <MemoryRouter initialEntries={['/details/25?frontpage=1&detail=pikachu']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
      expect(screen.queryByText('static')).not.toBeInTheDocument();
    });
  });
});
