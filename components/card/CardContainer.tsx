import { FC, useState } from 'react';
import Card from './Card';
import Button from '../button/Button';
import { useGetPokemonListQuery } from '@/store';
import styles from '@/styles/Card.module.scss';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { Details } from '../details/Details';

const CardContainer: FC = () => {
  const router = useRouter();
  const [isHasError, setIsHasError] = useState<boolean>(false);
  const [handleError, setHandleError] = useState<null | string>(null);
  const { currentPage, limitPage } = useAppSelector(
    (state) => state.pagination
  );
  const itemId = router.query.itemId as string;
  const { data, isLoading, isSuccess } = useGetPokemonListQuery({
    page: (currentPage * 2).toString(),
    limit: limitPage.toString(),
  });
  const { searchValue } = useAppSelector((state) => state.search);

  if (isHasError) {
    throw new Error(
      `Handle error message. ${handleError}. Please, reload page.`
    );
  }

  const throwError = () => {
    try {
      throw new Error('Custom error message');
    } catch (error) {
      console.error('Error caught:', error);
      setIsHasError(true);
      setHandleError((error as Error).message);
    }
  };

  return (
    <div>
      <h1>pokemon</h1>
      <Button handleButton={throwError} text={'Throw Error'} />
      <section className={styles.container}>
        <div className={styles.container__cards}>
          {!searchValue && isLoading && <h3>Loading...</h3>}

          {!searchValue &&
            isSuccess &&
            data?.map((item) => <Card key={item.name} name={item.name} />)}
          {searchValue && <Card name={searchValue} />}
        </div>
        <div className={styles.container__details}>{itemId && <Details />}</div>
      </section>
    </div>
  );
};

export default CardContainer;
