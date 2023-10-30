import React from 'react';
import Card from './Card';
import { Pokemon } from '../../pages/PokemonPages';
import Button from '../button/Button';

interface CardContainerProps {
  pokemon: Pokemon[];
  loading: boolean;
  error: null | string;
  onThrowError?: () => void;
}
interface CardContainerState {
  hasError: boolean;
  handleError: null | string;
}
class CardContainer extends React.Component<CardContainerProps> {
  state: CardContainerState = {
    hasError: false,
    handleError: null,
  };
  throwError = () => {
    try {
      throw new Error('Custom error message');
    } catch (error) {
      console.error('Error caught:', error);
      this.setState({ hasError: true, handleError: (error as Error).message });
    }
  };
  render() {
    if (this.state.hasError) {
      throw new Error(
        `Handle error message. ${this.state.handleError}. Please, reload page.`
      );
    }
    return (
      <>
        <h1>pokemon</h1>

        <Button onClick={this.throwError} text={'Throw Error'} />

        <section className="container">
          {this.props.loading ? (
            <p>Loading...</p>
          ) : (
            this.props.pokemon.map((item, ind) => (
              <Card
                key={ind}
                name={item.name}
                img={item.sprites?.other?.dream_world.front_default}
                abilities={item.abilities}
              />
            ))
          )}
        </section>
      </>
    );
  }
}

export default CardContainer;
