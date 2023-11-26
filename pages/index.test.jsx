import { screen, waitFor } from '@testing-library/react';
import { createMockRouter } from '../test/createMockRouter';
import PokemonPage from '.';
import { renderWithProviders } from '../test/test-utils';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import RootLayout from '../components/layout/layout';

describe('PokemonPage Component', () => {
  it('renders the PokemonPage with header', async () => {
    const mockRouter = createMockRouter({});
    renderWithProviders(
      <RouterContext.Provider value={mockRouter}>
        <RootLayout>
          <PokemonPage />
        </RootLayout>
      </RouterContext.Provider>
    );

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /Pokemon/i })
      ).toBeInTheDocument()
    );
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      expect(screen.queryByText('➡️')).toBeTruthy();
    });
  });
});
