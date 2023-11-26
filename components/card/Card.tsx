import { FC } from 'react';
import Link from 'next/link';
import styles from '../../styles/Card.module.scss';
import { useGetPokemonByNameQuery } from '../../store';
export interface CardProps {
  name: string;
}
const Card: FC<CardProps> = ({ name }) => {
  const { data, isLoading, isError, isSuccess } =
    useGetPokemonByNameQuery(name);

  return (
    <>
      {isError && <h3>Pokemon {name.toUpperCase()} was not found!</h3>}
      {isLoading && <h3>Loading...</h3>}
      {isSuccess && (
        <Link href={`/details/${name}`}>
          <div className={styles.card}>
            <div className={styles.card__img}>
              <img
                src={data?.sprites?.other?.dream_world.front_default}
                alt={name}
              />
            </div>
            <div className={styles.card__list}>
              <h3 className={styles.title}>{name}</h3>
              <h4 className={styles.subtitle}>Abilities:</h4>
              <ul>
                {data?.abilities?.map((ability) => (
                  <li className={styles.description} key={ability.ability.name}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
export default Card;
