import { Trans } from "@lingui/macro";

import { getErrorMessage, getErrorType } from "utils/errorHandling";

interface ErrorMessageProps {
    error: unknown;
    retry?: () => void;
    className?: string;
}

export const ErrorMessage = ({
    error,
    retry,
    className = "",
}: ErrorMessageProps) => {
    const errorType = getErrorType(error);
    const message = getErrorMessage(error);

    const getErrorTitle = () => {
        switch (errorType) {
            case "service_unavailable":
                return <Trans>Service not available</Trans>;
            case "access_denied":
                return <Trans>Access denied</Trans>;
            case "network_offline":
                return <Trans>No network connection</Trans>;
            case "server_error":
                return <Trans>Server error</Trans>;
            case "client_error":
                return <Trans>Request error</Trans>;
            default:
                return <Trans>Error</Trans>;
        }
    };

    const getErrorDescription = () => {
        switch (errorType) {
            case "service_unavailable":
                return (
                    <Trans>
                        This feature is not available on this node or requires
                        authentication.
                    </Trans>
                );
            case "access_denied":
                return (
                    <Trans>
                        You don't have permission to access this feature.
                    </Trans>
                );
            case "network_offline":
                return (
                    <Trans>
                        Please check your internet connection and try again.
                    </Trans>
                );
            case "server_error":
                return (
                    <Trans>
                        The server encountered an error. Please try again later.
                    </Trans>
                );
            case "client_error":
                return <Trans>There was a problem with your request.</Trans>;
            default:
                return <Trans>An unexpected error occurred.</Trans>;
        }
    };

    return (
        <div
            className={`error-message error-message--${errorType} ${className}`}
        >
            <div className="error-message__content">
                <h4 className="error-message__title">{getErrorTitle()}</h4>
                <p className="error-message__description">
                    {getErrorDescription()}
                </p>

                {retry && (
                    <button
                        onClick={retry}
                        className="button button--secondary"
                    >
                        <Trans>Try again</Trans>
                    </button>
                )}

                {process.env.NODE_ENV === "development" && (
                    <details className="error-message__details">
                        <summary>
                            <Trans>Technical details</Trans>
                        </summary>
                        <pre>{message}</pre>
                    </details>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
