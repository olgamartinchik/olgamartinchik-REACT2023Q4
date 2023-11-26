import { fireEvent, screen, waitFor } from '@testing-library/react';
import CardContainer from './CardContainer';
import { renderWithProviders } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { createMockRouter } from '../../test/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { server } from '../../mocks/server';
import PokemonPage from '../../pages';
import RootLayout from '../layout/layout';

describe('CardContainer Component', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());
  test('Renders the specified number of cards', async () => {
    renderWithProviders(
      <RouterContext.Provider
        value={createMockRouter({ query: { offset: '1', limit: '1' } })}
      >
        <CardContainer />
      </RouterContext.Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(1);
    });
  });

  test('Displays an appropriate message if no cards are present', async () => {
    renderWithProviders(
      <RouterContext.Provider
        value={createMockRouter({ query: { offset: '1', limit: '3' } })}
      >
        {/* <Header />
        <CardContainer /> */}
        <RootLayout>
          <PokemonPage />
        </RootLayout>
      </RouterContext.Provider>
    );
    await waitFor(() => {
      const input = screen.getByRole('textbox');
      userEvent.type(input, 'pikachu123');
      const searchButton = screen.getByText('Search');
      fireEvent.click(searchButton);
    });

    waitFor(() => {
      const noCardsMessage = screen.queryByText(
        /Pokemon PIKACHU123 was not found!/i
      );
      expect(noCardsMessage).toBeInTheDocument();
    });
  });
});
