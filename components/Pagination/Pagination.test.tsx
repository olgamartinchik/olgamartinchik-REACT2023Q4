import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Pagination } from './Pagination';
import { renderWithProviders } from '../../test/test-utils';
import { vi } from 'vitest';

describe('Pagination Component', () => {
  vi.mock('next/router', () => require('next-router-mock'));
  it('Updates URL query parameter when page changes', async () => {
    renderWithProviders(<Pagination />);
    await waitFor(() => {
      expect(window.location.search).toBe('?offset=1&limit=20');
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('➡️'));
    });
    await waitFor(() => {
      expect(window.location.search).toBe('?offset=2&limit=20');
    });

    const selectElement = screen.getByLabelText('Select limit');
    fireEvent.change(selectElement, { target: { value: '10' } });

    await waitFor(() => {
      expect(window.location.search).toBe('?offset=1&limit=10');
    });
  });
  it('Changes current page when clicking "Next" and "Previous"', async () => {
    renderWithProviders(<Pagination />);
    await waitFor(() => {
      expect(window.location.search).toBe('?offset=1&limit=20');
    });

    fireEvent.click(screen.getByText('➡️'));
    await waitFor(() => {
      expect(window.location.search).toBe('?offset=2&limit=20');
    });

    fireEvent.click(screen.getByText('⬅️'));
    await waitFor(() => {
      expect(window.location.search).toBe('?offset=1&limit=20');
    });
  });
  it('Displays correct page range', async () => {
    renderWithProviders(<Pagination />);
    await waitFor(() => {
      expect(window.location.search).toBe('?offset=1&limit=20');
    });

    expect(screen.getByText('1')).toBeInTheDocument();

    for (let i = 2; i <= 5; i++) {
      const pageElement = screen.queryByText(i.toString());
      expect(pageElement).toBeTruthy();
    }

    fireEvent.click(screen.getByText('➡️'));
    await waitFor(() => {
      expect(window.location.search).toBe('?offset=2&limit=20');
    });

    for (let i = 2; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }

    expect(screen.queryByText('11')).toBeNull();
  });
  it('Does not display "Previous" button on the first page', async () => {
    renderWithProviders(<Pagination />);
    expect(screen.queryByText('⬅️')).toBeNull();
    const totalPages = '...';
    expect(screen.queryByText(totalPages)).toBeTruthy();
  });

  it('Does not display "Next" button on the last page', async () => {
    renderWithProviders(<Pagination />);
    expect(screen.queryByText('⬅️')).toBeNull();
    fireEvent.click(screen.getByText('➡️'));
    expect(screen.queryByText('⬅️')).toBeTruthy();
    expect(screen.queryByText('➡️')).toBeTruthy();
  });
});
