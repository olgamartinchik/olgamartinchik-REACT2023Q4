import React, { ChangeEvent, FC, useEffect, useState } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}
const Input: FC<InputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue.toLowerCase().trim());
  };

  return (
    <input
      type="text"
      placeholder="Search"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
export default Input;
