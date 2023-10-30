import React from 'react';
import './Card.scss';
import { PokemonAbility } from '../../pages/PokemonPages';

interface CardProps {
  name?: string;
  img?: string;
  abilities?: PokemonAbility[];
}
class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    return (
      <div className="card">
        <div className="card-img">
          <img src={this.props!.img} />
        </div>
        <div className="card-list">
          <h3 className="title">{this.props!.name}</h3>
          <h4 className="subtitle">Abilities:</h4>
          <ul>
            {this.props!.abilities?.map((ability) => (
              <li className="description" key={ability.ability.name}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default Card;
