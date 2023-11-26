import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Content without errors</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Content without errors')).toBeInTheDocument();
  });

  it('renders fallback UI when there is an error', () => {
    const errorMessage = 'Test error message';

    const ThrowErrorComponent = () => {
      throw new Error(errorMessage);
    };

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(`Seems like an error occurred!`)
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls console.error and componentDidCatch when an error occurs', () => {
    const errorSpy = vi.spyOn(console, 'error');
    const errorMessage = 'Test error message';

    const ThrowErrorComponent = () => {
      throw new Error(errorMessage);
    };

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'ErrorBoundary',
      expect.any(Error),
      expect.any(Object)
    );
    expect(
      screen.getByText(`Seems like an error occurred!`)
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
