import { FC } from 'react';

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
