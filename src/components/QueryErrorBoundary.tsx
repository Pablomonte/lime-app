import { Trans } from "@lingui/macro";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

import { ErrorBoundary } from "./ErrorBoundary";

interface QueryErrorFallbackProps {
    error: Error;
    reset: () => void;
}

const QueryErrorFallback = ({ error, reset }: QueryErrorFallbackProps) => {
    // Check if it's a UBUS error
    const isUbusError =
        (error as any)?.code === -32000 || (error as any)?.code === -32002;

    if (isUbusError) {
        return (
            <div className="query-error query-error--ubus">
                <div className="query-error__content">
                    <h4>
                        <Trans>Service unavailable</Trans>
                    </h4>
                    <p>
                        <Trans>
                            This feature requires authentication or the service
                            is not available on this node.
                        </Trans>
                    </p>
                    <button
                        onClick={reset}
                        className="button button--secondary"
                    >
                        <Trans>Retry</Trans>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="query-error">
            <div className="query-error__content">
                <h4>
                    <Trans>Failed to load data</Trans>
                </h4>
                <p>
                    <Trans>There was a problem loading this information.</Trans>
                </p>
                <button onClick={reset} className="button">
                    <Trans>Try again</Trans>
                </button>
                {process.env.NODE_ENV === "development" && (
                    <details className="query-error__details">
                        <summary>
                            <Trans>Error details</Trans>
                        </summary>
                        <pre>{error.message}</pre>
                    </details>
                )}
            </div>
        </div>
    );
};

interface QueryErrorBoundaryProps {
    children: preact.ComponentChildren;
}

export const QueryErrorBoundary = ({ children }: QueryErrorBoundaryProps) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    fallback={({ error }) => (
                        <QueryErrorFallback error={error} reset={reset} />
                    )}
                    onError={(error) => {
                        // Log query errors with context
                        console.warn("Query error caught by boundary:", error);
                    }}
                >
                    {children}
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};

export default QueryErrorBoundary;
