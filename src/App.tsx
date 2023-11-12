import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { RoutesApp } from './routes/RoutesApp';

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
