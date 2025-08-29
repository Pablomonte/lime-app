import { QueryClient } from "@tanstack/react-query";

import { logError, shouldRetryError } from "./errorHandling";

const queryCache = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: process.env.NODE_ENV === "test" ? Infinity : Infinity,
            refetchOnMount: false,
            retry:
                process.env.NODE_ENV === "test"
                    ? false // Disable retries in tests
                    : (failureCount, error) => {
                          return shouldRetryError(error, failureCount);
                      },
            refetchOnWindowFocus: false,
            refetchInterval: false,
            onError:
                process.env.NODE_ENV === "test"
                    ? () => {} // Silent errors in tests
                    : (error) => {
                          logError(error, "Query");
                      },
        },
        mutations: {
            onError:
                process.env.NODE_ENV === "test"
                    ? () => {} // Silent errors in tests
                    : (error) => {
                          logError(error, "Mutation");
                      },
        },
    },
    logger: {
        log: process.env.NODE_ENV === "test" ? () => {} : console.log,
        warn: process.env.NODE_ENV === "test" ? () => {} : console.warn,
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
