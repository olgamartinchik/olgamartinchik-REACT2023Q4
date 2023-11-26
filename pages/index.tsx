import { Pagination } from '../components/Pagination/Pagination';
import CardContainer from '../components/card/CardContainer';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { START_LIMIT, START_PAGE } from '../constants/countPage';
import {
  getPokemonByName,
  getPokemonList,
  getRunningQueriesThunk,
} from '../store';
import { useAppSelector } from '../store/hooks';
import { wrapper } from '../store/store';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      const { offset, limit } = context.params || {};

      const { data } = await store.dispatch(
        getPokemonList.initiate({
          page: (offset as string) || START_PAGE.toString(),
          limit: (limit as string) || START_LIMIT.toString(),
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
  const { searchValue } = useAppSelector((state) => state.search);

  return (
    <>
      <ErrorBoundary>
        <CardContainer />
      </ErrorBoundary>
      {!searchValue && <Pagination />}
    </>
  );
};

export default PokemonPage;
