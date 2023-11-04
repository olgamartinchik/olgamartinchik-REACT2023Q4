import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Pokemon } from '../../pages/PokemonPages';
import './Details.scss';
import { Button } from '../button/Button';

export const Details = () => {
  const [searchParams] = useSearchParams();

  const [details, setDetails] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const detailQuery = searchParams.get('detail');
  const navigate = useNavigate();

  if (error) {
    throw new Error(error);
  }
  const fetchData = async (detailQuery: string): Promise<Pokemon | void> => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${detailQuery}`;

    try {
      const res = await fetch(URL);

      if (res.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      setError((error as Error).message);
      console.error(error);
    }
  };

  useEffect(() => {
    let timerId: number;
    if (detailQuery) {
      console.log('detailQuery', detailQuery);
      setLoading(true);
      timerId = setTimeout(async () => {
        try {
          const value = await fetchData(detailQuery);
          setDetails(value as Pokemon);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }, 2000);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [detailQuery]);

  if (!detailQuery) {
    navigate(-1);
  }

  const closeDetails = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="details-column"></div>
      <div className="overlay" onClick={closeDetails}>
        {loading ? (
          <h3 className="loader">Loading...</h3>
        ) : (
          <div className="details">
            <>
              <h2 className="details__title">{details?.name}</h2>
              <div className="card-img">
                <img src={details?.sprites?.other?.dream_world.front_default} />
              </div>
              <div className="details__list">
                <h4 className="subtitle">Abilities:</h4>
                <ul>
                  {details?.abilities?.map((ability) => (
                    <li className="description" key={ability.ability.name}>
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
