import React, { ChangeEvent } from 'react';
import './Input.scss';
interface InputProps {
  value: string;
  onChange: (value: string) => void;
}
class Input extends React.Component<InputProps> {
  state = {
    value: '',
  };
  constructor(props: InputProps) {
    super(props);
  }
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    this.props.onChange(newValue.toLowerCase().trim());
  };
  render(): React.ReactNode {
    return (
      <input
        type="text"
        placeholder="Search"
        value={this.props.value}
        onChange={this.handleInputChange}
      />
    );
  }
}
export default Input;
