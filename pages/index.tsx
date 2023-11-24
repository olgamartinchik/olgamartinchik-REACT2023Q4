import { Pagination } from '@/components/Pagination/Pagination';
import CardContainer from '@/components/card/CardContainer';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import {
  getPokemonByName,
  getPokemonList,
  getRunningQueriesThunk,
  setSearchValue,
} from '@/store';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      const { offset, limit, search } = context.params || {};

      store.dispatch(setSearchValue((search as string) || ''));

      const { data } = await store.dispatch(
        getPokemonList.initiate({
          page: (offset as string) || '1',
          limit: (limit as string) || '20',
        })
      );
      if (data) {
        await Promise.all(
          data.map((item) =>
            store.dispatch(getPokemonByName.initiate(item.name))
          )
        );
      }

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return {
        props: {},
      };
    } catch (error) {
      console.error('Error during server-side rendering:', error);
      return {
        props: {},
      };
    }
  });

const PokemonPage = () => {
  return (
    <>
      <ErrorBoundary>
        <CardContainer />
      </ErrorBoundary>
      <Pagination />
    </>
  );
};

export default PokemonPage;
