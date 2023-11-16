import { FC, useEffect } from 'react';
import './Card.scss';
import { useGetPokemonByNameQuery } from '../../store';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

export interface CardProps {
  name: string;
}
export const Card: FC<CardProps> = ({ name }) => {
  const [searchParams] = useSearchParams();

  const { searchValue } = useAppSelector((state) => state.search);
  const { data, error, isLoading, isError, isSuccess } =
    useGetPokemonByNameQuery(name);

  useEffect(() => {
    // console.log('data', data);
  }, [data]);
  // if (isError) {
  //   throw new Error(`Handle error message. ${error}. Please, reload page.`);
  // }
  const postQuery = searchParams.get('offset');
  return (
    <>
      {isError && <h3>Pokemon {searchValue.toUpperCase()} was not found!</h3>}
      {isLoading && <h3>Loading...</h3>}
      {isSuccess && (
        <Link to={`/details/${data?.id}?frontpage=${postQuery}&detail=${name}`}>
          <div className="card">
            <div className="card-img">
              <img
                src={data?.sprites?.other?.dream_world.front_default}
                alt={name}
              />
            </div>
            <div className="card-list">
              <h3 className="title">{name}</h3>
              <h4 className="subtitle">Abilities:</h4>
              <ul>
                {data?.abilities?.map((ability) => (
                  <li className="description" key={ability.ability.name}>
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
