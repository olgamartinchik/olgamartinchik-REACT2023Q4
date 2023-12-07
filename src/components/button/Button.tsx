import { ButtonHTMLAttributes, FC } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleButton?: () => void;
  text: string;
}

export const Button: FC<ButtonProps> = ({ handleButton, text, ...rest }) => {
  const handleSearch = (): void => {
    if (handleButton) {
      handleButton();
    }
  };

  return (
    <button onClick={handleSearch} {...rest}>
      {text}
    </button>
  );
};
