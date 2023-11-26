import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import Card from './Card';
import { renderWithProviders } from '../../test/test-utils';
import CardContainer from './CardContainer';
import { Details } from '../details/Details';
import { createMockRouter } from '../../test/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { server } from '../../mocks/server';

describe('Card Component', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());
  it('Render the card with relevant data', async () => {
    renderWithProviders(<Card name="pikachu" />);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();

      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
      );

      expect(screen.getByText('static')).toBeInTheDocument();
      expect(screen.getByText('lightning-rod')).toBeInTheDocument();
    });
  });

  it('Clicking on a card opens a detailed card component', async () => {
    const mockRoute = createMockRouter({
      pathname: '/',
      query: { offset: '1', limit: '3' },
    });

    renderWithProviders(
      <>
        <RouterContext.Provider value={mockRoute}>
          <CardContainer>
            <Details />
          </CardContainer>
        </RouterContext.Provider>
      </>
    );
    await waitFor(() => {
      userEvent.click(screen.queryByText('bulbasaur')!);

      mockRoute.pathname = '/details';
      mockRoute.query = { itemId: 'bulbasaur' };
    });
    renderWithProviders(
      <>
        <RouterContext.Provider value={mockRoute}>
          <CardContainer>
            <Details />
          </CardContainer>
        </RouterContext.Provider>
      </>
    );
    await waitFor(() => {
      expect(screen.getByText('Loading details...')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  it('triggers an additional API call on card click', async () => {
    renderWithProviders(<Card name="pikachu" />);

    await waitFor(() => {
      screen.debug();
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      const user = userEvent.setup();

      userEvent.click(screen.getByText('pikachu'));

      const spyAnchorTag = vi.spyOn(user, 'click');
      user.click(screen.getByText('pikachu'));

      expect(spyAnchorTag).toHaveBeenCalledTimes(1);
    });
  });
});
