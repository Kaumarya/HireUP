// ─── Error Boundary Component ───────────────────────────────────────────────────────
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Store error details in state
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-8">
          <div className="glass-card rounded-2xl p-8 max-w-2xl w-full text-center">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-text-muted mb-6">
              An error occurred while loading this page. Please try refreshing the page.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90 transition-colors"
              >
                Refresh Page
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-bg-elevated border border-bg-border text-text-primary rounded-lg font-medium hover:bg-bg-border transition-colors"
              >
                Go Back
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-text-dim">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-bg-elevated rounded text-xs text-red-400 overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
