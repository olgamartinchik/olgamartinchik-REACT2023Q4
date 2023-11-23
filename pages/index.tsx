import { Pagination } from '@/components/Pagination/Pagination';
import CardContainer from '@/components/card/CardContainer';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';

const PokemonPage = () => {
  return (
    <>
      <ErrorBoundary>
        <CardContainer />
      </ErrorBoundary>
      <Pagination />
    </>
  );
};
export default PokemonPage;
