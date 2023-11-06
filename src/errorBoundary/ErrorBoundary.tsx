import React, { Component, ReactNode, ReactElement } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactElement | ReactNode;
}
interface ErrorBoundaryState {
  error: null | Error;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary', error, info);
  }
  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <h3>Seems like an error occurred!</h3>
          <h4>{error.message}</h4>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
