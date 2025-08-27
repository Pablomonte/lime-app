/**
 * Enhanced error handling utilities for LibreMesh UBUS and network errors
 */

export interface UbusError {
    code: number;
    message: string;
    data?: unknown;
}

export interface NetworkError extends Error {
    status?: number;
    statusText?: string;
}

export const UBUS_ERROR_CODES = {
    OBJECT_NOT_FOUND: -32000,
    ACCESS_DENIED: -32002,
    METHOD_NOT_FOUND: -32601,
    INVALID_PARAMS: -32602,
    INTERNAL_ERROR: -32603,
} as const;

export const isUbusError = (error: unknown): error is UbusError => {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as any).code === "number"
    );
};

export const isNetworkError = (error: unknown): error is NetworkError => {
    return (
        error instanceof Error && ("status" in error || "statusText" in error)
    );
};

export const getErrorType = (error: unknown): string => {
    if (isUbusError(error)) {
        switch (error.code) {
            case UBUS_ERROR_CODES.OBJECT_NOT_FOUND:
                return "service_unavailable";
            case UBUS_ERROR_CODES.ACCESS_DENIED:
                return "access_denied";
            case UBUS_ERROR_CODES.METHOD_NOT_FOUND:
                return "method_not_found";
            case UBUS_ERROR_CODES.INVALID_PARAMS:
                return "invalid_params";
            case UBUS_ERROR_CODES.INTERNAL_ERROR:
                return "internal_error";
            default:
                return "ubus_error";
        }
    }

    if (isNetworkError(error)) {
        if (error.status === 0 || !navigator.onLine) {
            return "network_offline";
        }
        if (error.status && error.status >= 500) {
            return "server_error";
        }
        if (error.status && error.status >= 400) {
            return "client_error";
        }
        return "network_error";
    }

    return "unknown_error";
};

export const shouldRetryError = (
    error: unknown,
    failureCount: number
): boolean => {
    const errorType = getErrorType(error);

    // Never retry authentication or service unavailable errors
    if (errorType === "access_denied" || errorType === "service_unavailable") {
        return false;
    }

    // Don't retry client errors (4xx)
    if (errorType === "client_error") {
        return false;
    }

    // Retry network errors and server errors up to 2 times
    if (
        errorType === "network_error" ||
        errorType === "server_error" ||
        errorType === "network_offline"
    ) {
        return failureCount < 2;
    }

    // Retry other errors once
    return failureCount < 1;
};

export const getErrorMessage = (error: unknown): string => {
    if (isUbusError(error)) {
        return error.message || `UBUS Error ${error.code}`;
    }

    if (isNetworkError(error)) {
        return error.message || error.statusText || "Network error";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "An unknown error occurred";
};

export const logError = (error: unknown, context?: string): void => {
    const errorType = getErrorType(error);
    const message = getErrorMessage(error);

    // Don't log expected UBUS errors or successful responses
    if (
        errorType === "service_unavailable" ||
        errorType === "access_denied" ||
        (typeof error === "object" && error !== null && "result" in error)
    ) {
        return;
    }

    // Don't log "invalid mac" errors - these are expected when MAC is empty/invalid
    if (
        message === "invalid mac" ||
        (typeof error === "string" && error === "invalid mac")
    ) {
        return;
    }

    const logContext = context ? `[${context}]` : "";
    console.error(`${logContext} ${errorType}:`, message, error);
};

export const createErrorHandler = (context: string) => {
    return (error: unknown) => {
        logError(error, context);
        throw error;
    };
};
