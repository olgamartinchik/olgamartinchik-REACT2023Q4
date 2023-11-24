import React, { useEffect, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store';
import styles from '@/styles/Header.module.scss';
import { useRouter } from 'next/router';

const Header = () => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();

  useEffect(() => {
    const val = (query.search as string) || '';
    dispatch(setSearchValue(val));
    setValue(val);
  }, []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    localStorage.setItem('searchValue', value);
    const url = {
      pathname: router.pathname,
      query: {
        ...query,
        search: encodeURIComponent(value),
      },
    };
    const newUrl = new URL(window.location.href);
    newUrl.search = new URLSearchParams(url.query).toString();
    window.history.replaceState({}, '', newUrl.href);

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
