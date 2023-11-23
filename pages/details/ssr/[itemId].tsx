import { getPokemonByName, getRunningQueriesThunk } from '@/store';
import { wrapper } from '@/store/store';
import DetailPage from '../[itemId]';

export default DetailPage;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    if (typeof name === 'string') {
      store.dispatch(getPokemonByName.initiate(name));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
