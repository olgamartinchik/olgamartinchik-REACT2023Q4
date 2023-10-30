import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';
import { Pokemon } from '../../pages/PokemonPages';

export const Details = () => {
  const { itemId } = useParams();
  const [details, setDetails] = useState<Pokemon | null>(null);
  const pokemon = useContext(PokemonContext);
  useEffect(() => {
    console.log(pokemon);
    if (pokemon.length) {
      const pokemonDetails = pokemon.find((p) => p.id === +itemId!);
      setDetails(pokemonDetails || null);
    }
  }, [itemId, pokemon]);

  if (!details) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{details.name}</h2>
      <img src={details.sprites?.other?.dream_world.front_default} />
      <h4 className="subtitle">Abilities:</h4>
      <ul>
        {details.abilities?.map((ability) => (
          <li className="description" key={ability.ability.name}>
            {ability.ability.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
