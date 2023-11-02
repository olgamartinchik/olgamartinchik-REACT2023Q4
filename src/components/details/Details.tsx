import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';
import { Pokemon } from '../../pages/PokemonPages';
import './Details.scss';
import { Button } from '../button/Button';

export const Details = () => {
  const { itemId } = useParams();
  const [details, setDetails] = useState<Pokemon | null>(null);
  const pokemon = useContext(PokemonContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(pokemon);
    if (pokemon.length) {
      const pokemonDetails = pokemon.find((p) => p.id === +itemId!);
      setDetails(pokemonDetails || null);
    }
  }, [itemId, pokemon]);

  if (!details) {
    return <div></div>;
  }

  const closeDetails = () => {
    navigate('/');
  };
  return (
    <div className="details">
      <h2 className="details__title">{details.name}</h2>
      <div className="card-img">
        <img src={details.sprites?.other?.dream_world.front_default} />
      </div>
      <div className="details__list">
        <h4 className="subtitle">Abilities:</h4>
        <ul>
          {details.abilities?.map((ability) => (
            <li className="description" key={ability.ability.name}>
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>

      <Button text={'Close'} handleButton={closeDetails} />
    </div>
  );
};
