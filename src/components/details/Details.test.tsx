import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter, Route, Routes, BrowserRouter } from 'react-router-dom';
import { pokemonMock } from '../../mock/pokemon_mock';
// import axios from 'axios';

const mockCardData = pokemonMock[0];
// vi.mock('axios');

describe('Details Component', () => {
  it('displays a loading indicator while fetching data', async () => {
    // const promise = Promise.resolve({ data: mockCardData });

    // axios.get.mockImplementationOnce(() => promise);
    render(
      <MemoryRouter initialEntries={['/details/25?frontpage=1&detail=pikachu']}>
        <Details />
      </MemoryRouter>
    );

    waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());

    waitFor(() => expect(screen.getByText('pikachu')).toBeInTheDocument());

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('Abilities:')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning-rod')).toBeInTheDocument();
  });
});

// it('displays detailed card data correctly', async () => {
//   render(
//     <MemoryRouter initialEntries={['/details?detail=pikachu']}>
//       <Details />
//     </MemoryRouter>
//   );
//   // Wait for data to be loaded
//   await waitFor(() =>
//     expect(screen.getByText('pikachu')).toBeInTheDocument()
//   );
//   // Ensure other details are displayed correctly based on your component
//   expect(screen.getByText('Abilities:')).toBeInTheDocument();
//   expect(screen.getByText('static')).toBeInTheDocument();
//   expect(screen.getByText('lightning-rod')).toBeInTheDocument();
// });
// it('hides the component when clicking the close button', async () => {
//   render(
//     <MemoryRouter initialEntries={['/details?detail=pikachu']}>
//       <Routes>
//         <Route path="/details">
//           <Details />
//         </Route>
//       </Routes>
//     </MemoryRouter>
//   );
//   // Wait for data to be loaded
//   await waitFor(() =>
//     expect(screen.getByText('pikachu')).toBeInTheDocument()
//   );
//   // Click on the close button
//   fireEvent.click(screen.getByText('Close'));
//   // Wait for the component to be hidden
//   await waitFor(() => expect(screen.queryByText('pikachu')).toBeNull());
// });
