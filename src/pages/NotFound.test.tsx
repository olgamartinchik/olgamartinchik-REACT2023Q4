// NotFound.test.jsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFound from './notFound';
describe('NotFound Component', () => {
  it('displays the 404 page for invalid route', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
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
  it('displays the 404 page for invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
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
});
