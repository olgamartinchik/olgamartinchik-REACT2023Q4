import React, { useContext, useEffect, useState } from 'react';
import Input from '../input/Input';
import './Header.scss';
import { Button } from '../button/Button';
import { PokemonContext } from '../../context/PokemonContext';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');
  // const { updatePokemon, searchValue } = useContext(PokemonContext);
  const dispatch = useDispatch();
  const { searchValue } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(setSearchValue(localStorage.getItem('searchValue') || ''));
    setValue(localStorage.getItem('searchValue') || '');
  }, []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    // const offset = searchParams.get('offset') || '';
    // const limit = searchParams.get('limit') || '';
    // updatePokemon!(value, offset, limit);
    // setSearchParams({
    //   search: value,
    // });
    localStorage.setItem('searchValue', value);
    dispatch(setSearchValue(value));
  };

  return (
    <header className="header">
      <Input value={value} onChange={handleChange} />
      <Button handleButton={handleSearch} text={'Search'} />
    </header>
  );
};
