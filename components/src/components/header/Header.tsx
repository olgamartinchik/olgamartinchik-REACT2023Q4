import React from 'react';
import Input from '../input/Input';
import './Header.scss';
import Button from '../button/Button';

interface HeaderProps {
  // value: string;
  updatePokemon: (searchValue: string) => void;
}

class Header extends React.Component<HeaderProps> {
  state = {
    value: '',
  };
  componentDidMount() {
    const localSearchQuery = localStorage.getItem('searchValue') as string;

    this.setState({
      value: localSearchQuery ? localSearchQuery : '',
    });
  }
  handleChange = (newValue: string) => {
    this.setState({
      value: newValue,
    });
  };

  handleSearch = () => {
    localStorage.setItem('searchValue', this.state.value);
    // this.setState({
    //   value: '',
    // });
    this.props.updatePokemon(this.state.value);
  };

  render() {
    return (
      <header className="header">
        <Input value={this.state.value} onChange={this.handleChange} />
        <Button onClick={this.handleSearch} text={'Search'} />
      </header>
    );
  }
}

export default Header;
