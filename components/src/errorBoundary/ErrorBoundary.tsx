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
    return {error};
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary', error, info);
   
  }
  render() {
    const { error } = this.state;

    if (error) {
        return (
            <div>
                <p>Seems like an error occured!</p>
                <p>{error.message}</p>
            </div>
        );
    }
        return this.props.children;
  }
}

export default ErrorBoundary;
