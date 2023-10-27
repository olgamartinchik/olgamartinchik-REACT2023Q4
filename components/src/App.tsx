import './App.scss';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import PokemonPage from './pages/PokemonPages';

function App() {
  return (
    <ErrorBoundary>
      <PokemonPage />
    </ErrorBoundary>
  );
}

export default App;
