import { screen, waitFor } from '@testing-library/react';
import NotFound from './404';
import { createMockRouter } from '../test/createMockRouter';
import PokemonPage from '.';
import { server } from '../mocks/server';
import { renderWithProviders } from '../test/test-utils';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('NotFound Component', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());
  it('displays the 404 page for invalid route', () => {
    renderWithProviders(
      <RouterContext.Provider value={createMockRouter({})}>
        <NotFound />
      </RouterContext.Provider>
    );

    const notFoundHeading = screen.getByRole('heading', {
      name: /404 Not Found/i,
    });
    const notFoundMessage = screen.getByText(
      /Sorry, the page you are looking for does not exist/i
    );

    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
  });
  it('displays the 404 page for invalid route', async () => {
    //   // <MemoryRouter initialEntries={['/invalid-route']}>
    //   //   <Routes>
    //   //     <Route path="*" element={<NotFound />} />
    //   //   </Routes>
    //   // </MemoryRouter>

    const invalidURL = 'invalid-route';
    const mockRouter = createMockRouter({
      pathname: invalidURL,
    });
    renderWithProviders(
      <RouterContext.Provider value={mockRouter}>
        {mockRouter.pathname === invalidURL ? <NotFound /> : <PokemonPage />}
      </RouterContext.Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument()
    );
    screen.debug();
    expect(
      screen.getByRole('heading', { name: /404 Not Found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });
});
