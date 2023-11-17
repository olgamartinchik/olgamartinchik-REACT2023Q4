import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { Card } from './Card';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../test/test-utils';

import { Details } from '../details/Details';

describe('Card Component', () => {
  it('Render the card with relevant data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Card name="pikachu" />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      screen.debug();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
      );

      expect(screen.getByText('static')).toBeInTheDocument();
      expect(screen.getByText('lightning-rod')).toBeInTheDocument();
    });
  });

  it('Clicking on a card opens a detailed card component', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/pikachu?offset=1&limit=20']}>
        <Card name="pikachu" />
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('pikachu'));

    await waitFor(() => {
      screen.debug();
      expect(screen.getByText(/Loading.../)).toBeInTheDocument();

      // expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  it('triggers an additional API call on card click', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Card name="pikachu" />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      const user = userEvent.setup();

      userEvent.click(screen.getByText('pikachu'));

      const spyAnchorTag = vi.spyOn(user, 'click');
      user.click(screen.getByText('pikachu'));

      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
    });
  });
});
