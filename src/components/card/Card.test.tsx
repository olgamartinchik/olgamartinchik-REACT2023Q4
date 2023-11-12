import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import { pokemonMock } from '../../mock/pokemon_mock';
import { Card, CardProps } from './Card';
import { BrowserRouter } from 'react-router-dom';

const mockCardData = pokemonMock[0];
const mockCardProps: CardProps = {
  name: mockCardData.name,
  img: mockCardData.sprites.back_default,
  abilities: mockCardData.abilities,
};
export const assetsFetchMock = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => mockCardProps,
  } as Response);
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

  it('triggers an additional API call on card click', async () => {
    render(<Card {...mockCardProps} />, { wrapper: BrowserRouter });
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    const user = userEvent.setup();

    const spyAnchorTag = vi.spyOn(user, 'click');
    await user.click(screen.getByText('pikachu'));

    expect(spyAnchorTag).toHaveBeenCalledTimes(1);
  });
});
