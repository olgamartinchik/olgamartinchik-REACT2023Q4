import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { RoutesApp } from './routes/RoutesApp';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <RoutesApp />
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default App;
