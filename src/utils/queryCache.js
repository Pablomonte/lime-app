import { QueryClient } from "@tanstack/react-query";

import { logError, shouldRetryError } from "./errorHandling";

const queryCache = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            refetchOnMount: false,
            retry: (failureCount, error) => {
                return shouldRetryError(error, failureCount);
            },
            refetchOnWindowFocus: false,
            refetchInterval: false,
            onError: (error) => {
                logError(error, "Query");
            },
        },
        mutations: {
            onError: (error) => {
                logError(error, "Mutation");
            },
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        // ✅ no more errors on the console for tests
        error:
            process.env.NODE_ENV === "test"
                ? () => {}
                : (error) => {
                      logError(error, "QueryClient");
                  },
    },
});

export default queryCache;
