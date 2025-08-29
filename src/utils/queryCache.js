import { QueryClient } from "@tanstack/react-query";

import { logError, shouldRetryError } from "./errorHandling";
import { CACHE_STRATEGIES } from "./cacheStrategies";
import { withPerformanceTracking } from "./performanceMonitor";
import { createInvalidationHelper } from "./queryInvalidation";

const queryCache = new QueryClient({
    defaultOptions: {
        queries: {
            // Use intelligent caching strategy based on environment
            ...(process.env.NODE_ENV === "test" 
                ? CACHE_STRATEGIES.test 
                : CACHE_STRATEGIES.networkStatus), // Default fallback
            
            retry:
                process.env.NODE_ENV === "test"
                    ? false // Disable retries in tests
                    : (failureCount, error) => {
                          return shouldRetryError(error, failureCount);
                      },
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

// Enable performance tracking in development
const trackedQueryCache = process.env.NODE_ENV === 'development' 
    ? withPerformanceTracking(queryCache)
    : queryCache;

// Create smart invalidation helper
export const smartInvalidator = createInvalidationHelper(trackedQueryCache);

export default trackedQueryCache;
