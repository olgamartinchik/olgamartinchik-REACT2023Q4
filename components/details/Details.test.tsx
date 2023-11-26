import { screen, waitFor } from '@testing-library/react';
import { Details } from './Details';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import CardContainer from '../card/CardContainer';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../test/createMockRouter';
// import { server } from '../../mocks/server';

describe('Details Component', () => {
  // beforeAll(() => {
  //   server.listen();
  // });

  // afterEach(() => {
  //   server.resetHandlers();
  // });

  // afterAll(() => server.close());

  it('Check loader', async () => {
    renderWithProviders(
      <RouterContext.Provider
        value={createMockRouter({
          query: { itemId: 'pikachu' },
          pathname: 'details',
        })}
      >
        <CardContainer>
          {' '}
          <Details />
        </CardContainer>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading details.../)).toBeInTheDocument();
    });
    // waitFor(() => {
    //   expect(screen.getByText('pikachu')).toBeInTheDocument();
    // });
  });
  it('hides the component when clicking the close button', async () => {
    const router = createMockRouter({
      query: { itemId: 'pikachu' },
      pathname: 'details',
    });
    renderWithProviders(
      <RouterContext.Provider value={router}>
        <CardContainer>
          <Details />
        </CardContainer>
        {/* <DetailPage /> */}
      </RouterContext.Provider>
    );

    const closeButton = screen.queryByText('Close');

    await waitFor(() => {
      if (closeButton) {
        expect(screen.queryByText(/static/i)).toBeInTheDocument();
        expect(screen.queryByText(/lightning-rod/i)).toBeInTheDocument();
        userEvent.click(closeButton);
      }
    });

    await waitFor(() => {
      expect(closeButton).toBeNull();
    });
  });

  it('correctly displays detailed card data', async () => {
    renderWithProviders(
      <RouterContext.Provider
        value={createMockRouter({
          query: { itemId: 'pikachu' },
          pathname: 'details',
        })}
      >
        <Details />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
      );

      expect(screen.queryByText('Close')).toBeInTheDocument();
    });
  });
});
