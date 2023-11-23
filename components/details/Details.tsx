import styles from '@/styles/Details.module.scss';
import { FC } from 'react';
import Button from '@/components/button/Button';
import { useGetPokemonByNameQuery } from '@/store';
import { useRouter } from 'next/router';
import RootLayout from '@/components/layout/layout';

export const Details: FC = () => {
  const router = useRouter();
  const { itemId } = router.query;

  const { data, error, isLoading, isError, isSuccess } =
    useGetPokemonByNameQuery(itemId as string);

  const closeDetails = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.details__column}></div>
      <div className={styles.overlay} onClick={closeDetails}>
        {isLoading && <h3 className={styles.loader}>Loading details...</h3>}

        {isSuccess && (
          <div className={styles.details}>
            <>
              <h2 className={styles.details__title}>{data?.name}</h2>
              <div className={styles.card__img}>
                <img
                  src={data?.sprites?.other?.dream_world.front_default}
                  alt={data?.name}
                />
              </div>
              <div className={styles.details__list}>
                <h4 className={styles.subtitle}>Abilities:</h4>
                <ul>
                  {data?.abilities?.map((ability) => (
                    <li
                      className={styles.description}
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>

              <Button text={'Close'} handleButton={closeDetails} />
            </>
          </div>
        )}
      </div>
    </>
  );
};
