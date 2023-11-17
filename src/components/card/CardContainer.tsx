import { useState, useEffect } from 'react';
import { Card } from './Card';
import { Button } from '../button/Button';
import { Outlet } from 'react-router-dom';
import { useGetPokemonListQuery } from '../../store';
import { useAppSelector } from '../../store/store';

export const CardContainer = () => {
  const [isHasError, setIsHasError] = useState<boolean>(false);
  const [handleError, setHandleError] = useState<null | string>(null);
  const { currentPage, limitPage } = useAppSelector(
    (state) => state.pagination
  );
  const { data, error, isLoading, isError, isSuccess } = useGetPokemonListQuery(
    {
      page: (currentPage * 2).toString(),
      limit: limitPage.toString(),
    }
  );
  const { searchValue } = useAppSelector((state) => state.search);
  // if (isError) {
  //   throw new Error(`Handle error message. ${error}. Please, reload page.`);
  // }
  // useEffect(() => {
  //   // console.log('currentPage', currentPage);
  //   // console.log('limitPage', limitPage);
  //   console.log('searchValue', searchValue);
  //   console.log('data', data);
  // }, []);

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
      <section className="container">
        <div className="container__cards">
          {!searchValue && isLoading && <h3>Loading...</h3>}

          {!searchValue &&
            isSuccess &&
            data?.map((item) => <Card key={item.name} name={item.name} />)}
          {searchValue && <Card name={searchValue} />}
        </div>

        <div className="container__details">
          <Outlet />
        </div>
      </section>
    </div>
  );
};
