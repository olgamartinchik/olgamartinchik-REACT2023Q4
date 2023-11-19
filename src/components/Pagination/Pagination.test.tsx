import { screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Pagination } from './Pagination';
import { renderWithProviders } from '../../test/test-utils';

describe('Pagination Component', () => {
  it('Updates URL query parameter when page changes', () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    );

    expect(window.location.search).toBe('?offset=1&limit=20');

    fireEvent.click(screen.getByText('➡️'));

    expect(window.location.search).toBe('?offset=2&limit=20');
  });
});
