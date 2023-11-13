import { render, screen, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import { pokemonMock } from '../../mocks/pokemon_mock';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

const mockCardData = pokemonMock[0];

describe('Details Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Check loader', async () => {
    const promise = Promise.resolve({ data: mockCardData, status: 200 });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);

    render(
      <MemoryRouter initialEntries={['/details/25?frontpage=1&detail=pikachu']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });
    await waitFor(() => promise);
  });
  it('hides the component when clicking the close button', async () => {
    const promise = Promise.resolve({ data: mockCardData, status: 200 });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);
    render(
      <MemoryRouter initialEntries={['/details/25?frontpage=1&detail=pikachu']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    await waitFor(() => promise);

    expect(screen.queryByText('pikachu')).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByTestId('pikachu')).not.toBeInTheDocument();
    });
  });

  it('correctly displays detailed card data', async () => {
    const promise = Promise.resolve({ data: mockCardData, status: 200 });
    (axios.get as jest.Mock).mockImplementationOnce(() => promise);

    render(
      <MemoryRouter initialEntries={['/details/25?frontpage=1&detail=pikachu']}>
        <Details />
      </MemoryRouter>
    );
    await waitFor(() => promise);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('static')).toBeInTheDocument();
    });
  });
});
