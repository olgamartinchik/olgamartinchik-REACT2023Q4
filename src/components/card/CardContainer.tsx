import { FC, useContext, useState } from 'react';
import { Card } from './Card';
import { Pokemon } from '../../pages/PokemonPages';
import { Button } from '../button/Button';

import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';

export const CardContainer = () => {
  const [isHasError, setIsHasError] = useState<boolean>(false);
  const [handleError, setHandleError] = useState<null | string>(null);
  const [searchParams] = useSearchParams();
  const { pokemon, loading } = useContext(PokemonContext);

  const postQuery = searchParams.get('offset');

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
  {
  }
  return (
    <div>
      <h1>pokemon</h1>

      <Button handleButton={throwError} text={'Throw Error'} />

      <section className="container">
        <div className="container__cards">
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            pokemon.map((item) => (
              <Link
                to={`/details/${item.id}?frontpage=${postQuery}&detail=${item.name}`}
                key={item.id}
              >
                <Card
                  name={item.name}
                  img={item.sprites?.other?.dream_world.front_default}
                  abilities={item.abilities}
                />
              </Link>
            ))
          )}
        </div>

        <div className="container__details">
          <Outlet />
        </div>
      </section>
    </div>
  );
};
