import { useNavigate, useParams } from 'react-router-dom';
import './Details.scss';
import { Button } from '../button/Button';
import { useGetPokemonByNameQuery } from '../../store';
import { FC } from 'react';

export const Details: FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const pokemonName = itemId || 'pikachu';
  const { data, error, isLoading, isError, isSuccess } =
    useGetPokemonByNameQuery(pokemonName);

  const closeDetails = () => {
    navigate('/');
  };

  return (
    <>
      <div className="details-column"></div>
      <div className="overlay" onClick={closeDetails}>
        {isLoading && <h3 className="loader">Loading details...</h3>}

        {isSuccess && (
          <div className="details">
            <>
              <h2 className="details__title">{data?.name}</h2>
              <div className="card-img">
                <img
                  src={data?.sprites?.other?.dream_world.front_default}
                  alt={data?.name}
                />
              </div>
              <div className="details__list">
                <h4 className="subtitle">Abilities:</h4>
                <ul>
                  {data?.abilities?.map((ability) => (
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
