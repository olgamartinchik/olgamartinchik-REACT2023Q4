import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }
  handleSearch = () => {
    this.props.onClick();
  };
  render() {
    return <button onClick={this.handleSearch}>{this.props.text}</button>;
  }
}
export default Button;
