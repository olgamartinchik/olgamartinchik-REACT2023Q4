import CardContainer from '@/components/card/CardContainer';
import {
  getPokemonByName,
  getPokemonList,
  getRunningQueriesThunk,
  setSearchValue,
} from '@/store';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const { itemId } = context.params || {};
//     if (itemId && typeof itemId === 'string') {
//       store.dispatch(getPokemonByName.initiate(itemId));
//     }

//     await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );
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
const DetailPage = () => {
  return <CardContainer />;
};

export default DetailPage;
