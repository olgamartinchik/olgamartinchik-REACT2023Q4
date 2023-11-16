import { useNavigate, useSearchParams } from 'react-router-dom';
import './Details.scss';
import { Button } from '../button/Button';
import { useGetPokemonByNameQuery } from '../../store';

export const Details = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const detailQuery = searchParams.get('detail');
  const { data, error, isLoading, isError, isSuccess } =
    useGetPokemonByNameQuery(detailQuery || '');

  if (!detailQuery) {
    navigate(-1);
  }

  const closeDetails = () => {
    navigate(-1);
  };
  if (isError) {
    if ('status' in error && 'data' in error) {
      throw new Error(
        `Fetch error: ${error.status} - ${JSON.stringify(error.data)}`
      );
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
  return (
    <>
      <div className="details-column"></div>
      <div className="overlay" onClick={closeDetails}>
        {isLoading && <h3 className="loader">Loading...</h3>}

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
