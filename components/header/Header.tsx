import React, { useEffect, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store';
import styles from '@/styles/Header.module.scss';
import { useAppSelector } from '@/store/hooks';

const Header = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const { searchValue } = useAppSelector((state) => state.search);

  useEffect(() => {
    setValue(searchValue);
  }, []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    localStorage.setItem('searchValue', value);
    dispatch(setSearchValue(value));
  };

  return (
    <header className={styles.header}>
      <Input value={value} onChange={handleChange} />
      <Button handleButton={handleSearch} text={'Search'} />
    </header>
  );
};
export default Header;
