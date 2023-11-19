import { FC } from 'react';
import './Button.scss';

interface ButtonProps {
  handleButton: () => void;
  text: string;
}

export const Button: FC<ButtonProps> = ({ handleButton, text }) => {
  const handleSearch = (): void => {
    handleButton();
  };

  return <button onClick={handleSearch}>{text}</button>;
};
