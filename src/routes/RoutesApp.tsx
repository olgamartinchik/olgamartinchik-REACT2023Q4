import { Route, Routes } from 'react-router-dom';
import { PokemonPage } from '../pages/pokemonPages';
import { Details } from '../components/details/Details';
import NotFound from '../pages/notFound';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<PokemonPage />}>
        <Route path="/details/:itemId" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
