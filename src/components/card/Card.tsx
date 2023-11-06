import { FC } from 'react';
import './Card.scss';
import { PokemonAbility } from '../../pages/PokemonPages';

export interface CardProps {
  name?: string;
  img?: string;
  abilities?: PokemonAbility[];
}
export const Card: FC<CardProps> = ({ name, img, abilities }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src={img} />
      </div>
      <div className="card-list">
        <h3 className="title">{name}</h3>
        <h4 className="subtitle">Abilities:</h4>
        <ul>
          {abilities?.map((ability) => (
            <li className="description" key={ability.ability.name}>
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
