import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Details Component', () => {
  // it('displays a loading indicator while fetching data', async () => {
  //   render(
  //     <MemoryRouter initialEntries={['/details?detail=pikachu']}>
  //       <Routes>
  //         <Route path="/details" element={<Details />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   // Wait for the loading indicator to appear
  //   await waitFor(() =>
  //     expect(screen.getByText('Loading...')).toBeInTheDocument()
  //   );
  //   // Wait for data to be loaded
  //   await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
  //   // Now you can make assertions based on your component's behavior
  //   // For example, assert that the detailed data is rendered correctly
  //   expect(screen.getByText('pikachu')).toBeInTheDocument();
  //   expect(screen.getByText('Abilities:')).toBeInTheDocument();
  //   expect(screen.getByText('Static')).toBeInTheDocument();
  //   expect(screen.getByText('Lightning Rod')).toBeInTheDocument();
  // });
  // it('displays detailed card data correctly', async () => {
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
  //   // Ensure other details are displayed correctly based on your component
  //   expect(screen.getByText('Abilities:')).toBeInTheDocument();
  //   expect(screen.getByText('Static')).toBeInTheDocument();
  //   expect(screen.getByText('Lightning Rod')).toBeInTheDocument();
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
});
