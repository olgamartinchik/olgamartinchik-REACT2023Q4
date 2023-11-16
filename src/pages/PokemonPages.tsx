import { Header } from '../components/header/Header';
import { CardContainer } from '../components/card/CardContainer';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { Pagination } from '../components/Pagination/Pagination';
import { useAppSelector } from '../store/store';

export const PokemonPage = () => {
  const { searchValue } = useAppSelector((state) => state.search);
  return (
    <>
      <Header />
      <ErrorBoundary>
        <CardContainer />
        {!searchValue && <Pagination />}
      </ErrorBoundary>
    </>
  );
};
