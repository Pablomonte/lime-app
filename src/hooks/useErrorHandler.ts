import { Trans } from "@lingui/macro";
import { useCallback } from "preact/hooks";

import { useToast } from "components/toast/toastProvider";

import { getErrorMessage, getErrorType } from "utils/errorHandling";

interface UseErrorHandlerOptions {
    showToast?: boolean;
    logError?: boolean;
    onError?: (error: unknown) => void;
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
    const { showToast = true, logError = true, onError } = options;
    const { showToast: displayToast } = useToast();

    const handleError = useCallback(
        (error: unknown, context?: string) => {
            const errorType = getErrorType(error);
            const message = getErrorMessage(error);

            // Log error if enabled
            if (logError) {
                const logContext = context ? `[${context}]` : "";
                console.error(`${logContext} ${errorType}:`, message, error);
            }

            // Show toast for user-facing errors
            if (showToast && errorType !== "service_unavailable") {
                const toastMessage = getToastMessage(errorType);
                displayToast({ text: toastMessage, type: "error" });
            }

            // Call custom error handler if provided
            if (onError) {
                onError(error);
            }
        },
        [showToast, logError, onError, displayToast]
    );

    return { handleError };
};

const getToastMessage = (errorType: string): string => {
    switch (errorType) {
        case "access_denied":
            return "Access denied";
        case "network_offline":
            return "No network connection";
        case "server_error":
            return "Server error occurred";
        case "client_error":
            return "Request failed";
        default:
            return "An error occurred";
    }
};

export default useErrorHandler;
