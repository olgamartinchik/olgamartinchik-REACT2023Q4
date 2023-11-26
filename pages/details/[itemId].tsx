import CardContainer from '../../components/card/CardContainer';
import { Details } from '../../components/details/Details';
import { START_LIMIT, START_PAGE } from '../../constants/countPage';
import {
  getPokemonByName,
  getPokemonList,
  getRunningQueriesThunk,
  setSearchValue,
} from '../../store';
import { wrapper } from '../../store/store';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      const { itemId, offset, limit, search } = context.params || {};
      if (itemId && typeof itemId === 'string') {
        store.dispatch(getPokemonByName.initiate(itemId));
      }

      store.dispatch(setSearchValue((search as string) || ''));

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
const DetailPage = () => {
  return (
    <CardContainer>
      <Details />
    </CardContainer>
  );
};

export default DetailPage;
