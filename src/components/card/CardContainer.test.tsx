import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { CardContainer } from './CardContainer';
import { renderWithProviders } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { Header } from '../header/Header';

describe('CardContainer Component', () => {
  test('Renders the specified number of cards', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?offset=1&limit=3']}>
        <CardContainer />
      </MemoryRouter>
    );
    await waitFor(() => {});

    await waitFor(() => {
      const cards = screen.getAllByRole('link');
      expect(cards).toHaveLength(3);
    });
  });

  test('Displays an appropriate message if no cards are present', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Header />
        <CardContainer />
      </BrowserRouter>
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'pikachu123');
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    await waitFor(() => {});
    await waitFor(() => {
      screen.debug();

      const noCardsMessage = screen.queryByText(
        /Pokemon PIKACHU123 was not found!/i
      );
      expect(noCardsMessage).toBeInTheDocument();
    });
  });
});
