import { FC, useState } from 'react';
import { Card } from './Card';
import { Pokemon } from '../../pages/PokemonPages';
import { Button } from '../button/Button';
import { Details } from '../details/Details';
import { Link } from 'react-router-dom';

interface CardContainerProps {
  pokemon: Pokemon[];
  loading: boolean;
}

export const CardContainer: FC<CardContainerProps> = ({ pokemon, loading }) => {
  const [isHasError, setIsHasError] = useState<boolean>(false);
  const [handleError, setHandleError] = useState<null | string>(null);

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
    <>
      <h1>pokemon</h1>

      <Button handleButton={throwError} text={'Throw Error'} />

      <section className="container">
        <div className="container__cards">
          {loading ? (
            <p>Loading...</p>
          ) : (
            pokemon.map((item) => (
              <Link to={`/details/${item.id}`} key={item.id}>
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
          <Details />
        </div>
      </section>
    </>
  );
};
