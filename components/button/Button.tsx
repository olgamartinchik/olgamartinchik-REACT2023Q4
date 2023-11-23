import { FC } from 'react';

interface ButtonProps {
  handleButton: () => void;
  text: string;
}

const Button: FC<ButtonProps> = ({ handleButton, text }) => {
  const handleSearch = (): void => {
    handleButton();
  };

  return <button onClick={handleSearch}>{text}</button>;
};
export default Button;
