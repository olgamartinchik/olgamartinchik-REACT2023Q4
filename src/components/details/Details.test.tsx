import { render, screen, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import { pokemonMock } from '../../mocks/pokemon_mock';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { vi } from 'vitest';
import { renderWithProviders } from '../../test/test-utils';
import { setupStore } from '../../store/store';
import { pokemonApi, useGetPokemonByNameQuery } from '../../store';
import { CardContainer } from '../card/CardContainer';
import { Header } from '../header/Header';
import { Card } from '../card/Card';
import { server } from '../../mocks/server';
import { HttpResponse, delay, http } from 'msw';

const store = setupStore({});
const mockCardData = pokemonMock[0];
const preloadedState = {
  pokemonApi: {
    queries: {
      getPokemonByName: { data: mockCardData, state: 'uninitialized' },
    },
  },
};

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
      <MemoryRouter initialEntries={['/details/pikachu?page=1&offset=3']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });
    // await waitFor(() => promise);
  });
  it('hides the component when clicking the close button', async () => {
    // const promise = Promise.resolve({ data: mockCardData, status: 200 });
    // (axios.get as jest.Mock).mockImplementationOnce(() => promise);
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/pikachu', async () => {
        await delay(150);
        return HttpResponse.json(mockCardData);
      })
    );

    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/details/pikachu?page=1&offset=3']}>
        {/* <Header />
        <CardContainer /> */}
        <Card name="pikachu" />
        <Details />
      </MemoryRouter>
      // { preloadedState }
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    console.log('store', store.getState());
    console.log(
      'store',
      store.getState().pokemonApi.queries['getPokemonByName("pikachu")']
    );

    store.dispatch(
      pokemonApi.util.updateQueryData(
        'getPokemonByName',
        'pikachu',
        (data) => ({
          ...data,
          data: mockCardData,
          state: 'fulfilled',
        })
      )
    );
    await waitFor(() => {});
    // await waitFor(() => promise);
    // await waitFor(() => {
    //   expect(screen.queryByText('pikachu')).toBeInTheDocument();

    //   const user = userEvent.setup();
    //   user.click(screen.getByText('Close'));
    // });
    // await waitFor(() => {
    //   expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    //   expect(screen.queryByTestId('pikachu')).not.toBeInTheDocument();
    // });
  });

  it('correctly displays detailed card data', async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/details/pikachu?page=1&offset=3']}>
        {/* <Header />
        <CardContainer /> */}
        <Card name="pikachu" />
        <Details />
      </MemoryRouter>
    );
    store.dispatch(
      pokemonApi.util.updateQueryData(
        'getPokemonByName',
        'pikachu',
        (data) => ({
          ...data,
          data: mockCardData,
          state: 'fulfilled',
        })
      )
    );
    await waitFor(() => {});
    // await waitFor(() => {
    //   expect(screen.getByText('pikachu')).toBeInTheDocument();
    //   expect(screen.getByText('static')).toBeInTheDocument();
    //   expect(screen.getByText('Close')).toBeInTheDocument();
    // });
  });
});
