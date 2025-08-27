import { Component } from "preact";
import { Trans } from "@lingui/macro";

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: string;
}

interface ErrorBoundaryProps {
    children: preact.ComponentChildren;
    fallback?: preact.ComponentType<{ error: Error; reset: () => void }>;
    onError?: (error: Error, errorInfo: string) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        this.setState({
            error,
            errorInfo: errorInfo.componentStack,
        });

        if (this.props.onError) {
            this.props.onError(error, errorInfo.componentStack);
        }

        // Log error for debugging
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    reset = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    render() {
        if (this.state.hasError) {
            const { fallback: Fallback } = this.props;
            
            if (Fallback) {
                return <Fallback error={this.state.error!} reset={this.reset} />;
            }

            return (
                <div className="error-boundary">
                    <div className="error-boundary__content">
                        <h3><Trans>Something went wrong</Trans></h3>
                        <p><Trans>An unexpected error occurred. Please try refreshing the page.</Trans></p>
                        <button onClick={this.reset} className="button">
                            <Trans>Try again</Trans>
                        </button>
                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <details className="error-boundary__details">
                                <summary><Trans>Error details</Trans></summary>
                                <pre>{this.state.error.message}</pre>
                                <pre>{this.state.errorInfo}</pre>
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