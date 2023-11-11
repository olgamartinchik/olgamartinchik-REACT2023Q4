import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock'; // Import fetchMock here
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { pokemonMock } from '../../mock/pokemon_mock';
import { Card, CardProps } from './Card';
import { Details } from '../details/Details';

import { MemoryRouter } from 'react-router-dom';

const mockCardData = pokemonMock[0];
const mockCardProps: CardProps = {
  name: mockCardData.name,
  img: mockCardData.sprites.back_default,
  abilities: mockCardData.abilities,
};

describe('Card Component', () => {
  it('Render the card with relevant data', async () => {
    render(<Card {...mockCardProps} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();

    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
    );

    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning-rod')).toBeInTheDocument();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    render(<Card {...mockCardProps} />);

    const cardElement = screen.getByText('pikachu').closest('.card');
    fireEvent.click(cardElement!);

    const detailedCardTitle = await screen.findByText('pikachu');

    expect(detailedCardTitle).toBeInTheDocument();
  });

  // it('triggers an additional API call on card click', async () => {
  //   fetchMock.mock(
  //     'https://pokeapi.co/api/v2/pokemon/pikachu',
  //     JSON.stringify({ detailedInfo: 'additional data' })
  //   );

  //   render(<Card {...mockCardProps} />);

  //   userEvent.click(screen.getByText('pikachu'));

  //   await waitFor(() => {
  //     expect(fetchMock.called()).toBeTruthy();
  //   });

  //   expect(fetchMock.lastUrl()).toBe(
  //     'https://pokeapi.co/api/v2/pokemon/pikachu'
  //   );
  // });
});
