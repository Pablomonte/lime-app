/**
 * Optimized query hooks that automatically apply intelligent caching strategies
 */
import { useMutation, useQuery } from "@tanstack/react-query";

import { createOptimizedQueryConfig } from "./cacheStrategies";
import { getQueryErrorHandler } from "./queryErrorHandlers";

/**
 * Enhanced useQuery with automatic cache optimization
 * @param {string|function|Array} queryKeyOrFn - Query key string, array, or function that returns key
 * @param {function} queryFn - Query function
 * @param {object} options - Additional query options
 * @returns {object} Query result
 */
export const useOptimizedQuery = (queryKeyOrFn, queryFn, options = {}) => {
    // Extract query key name for cache strategy selection
    const queryKey =
        typeof queryKeyOrFn === "function" ? queryKeyOrFn() : queryKeyOrFn;
    const queryKeyName = Array.isArray(queryKey) ? queryKey[0] : queryKey;

    // Get optimized cache configuration
    const cacheConfig = createOptimizedQueryConfig(queryKeyName, options);

    // Combine with error handling
    const finalConfig = {
        ...cacheConfig,
        onError: options.onError || getQueryErrorHandler(queryKeyName),
        ...options, // Allow final overrides
    };

    return useQuery({
        queryKey,
        queryFn,
        ...finalConfig,
    });
};

/**
 * Smart query configuration for specific data categories
 */
export const useStaticQuery = (queryKey, queryFn, options = {}) => {
    const cacheConfig = createOptimizedQueryConfig("static-override", options);
    return useQuery({
        queryKey,
        queryFn,
        ...cacheConfig,
        staleTime: 30 * 60 * 1000, // 30 minutes for static data
        onError: options.onError || getQueryErrorHandler("static"),
        ...options,
    });
};

export const useRealtimeQuery = (queryKey, queryFn, options = {}) => {
    const cacheConfig = createOptimizedQueryConfig(
        "realtime-override",
        options
    );
    return useQuery({
        queryKey,
        queryFn,
        ...cacheConfig,
        staleTime: 30 * 1000, // 30 seconds for realtime
        refetchInterval: 60 * 1000, // Auto-refresh every minute
        onError: options.onError || getQueryErrorHandler("realtime"),
        ...options,
    });
};

export const useCriticalQuery = (queryKey, queryFn, options = {}) => {
    // Extract query key name for cache strategy
    const queryKeyName = Array.isArray(queryKey) ? queryKey[0] : queryKey;

    // Use the critical cache strategy from cacheStrategies.js
    const cacheConfig = createOptimizedQueryConfig(queryKeyName, options);

    return useQuery({
        queryKey,
        queryFn,
        ...cacheConfig,
        onError: options.onError || getQueryErrorHandler(queryKeyName),
        ...options, // Allow final overrides
    });
};

/**
 * Performance-optimized mutation with intelligent retry logic
 * @param {Function} mutationFn - The mutation function
 * @param {Object} options - Mutation options
 * @returns {Object} Mutation result with mutate function
 */
export const useOptimizedMutation = (mutationFn, options = {}) => {
    return useMutation({
        mutationFn,
        retry: (failureCount, error) => {
            // Don't retry client-side errors
            if (
                error &&
                typeof error === "object" &&
                "status" in error &&
                error.status >= 400 &&
                error.status < 500
            ) {
                return false;
            }
            // Retry server errors up to 2 times
            return failureCount < 2;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        ...options,
    });
};

/**
 * Batch query invalidation helper
 */
export const createInvalidationHelper = (queryClient) => ({
    // Invalidate by category
    invalidateStatic: () => {
        queryClient.invalidateQueries({
            predicate: (query) => {
                const key = query.queryKey[0];
                return ["system", "lime-utils"].includes(key);
            },
        });
    },

    invalidateNetworkStatus: () => {
        queryClient.invalidateQueries({
            predicate: (query) => {
                const key = query.queryKey[0];
                return ["check-internet", "iwinfo", "bat-hosts"].includes(key);
            },
        });
    },

    invalidateRealtime: () => {
        queryClient.invalidateQueries({
            predicate: (query) => {
                const key = query.queryKey[0];
                return ["iwinfo", "lime-metrics"].includes(key);
            },
        });
    },

    invalidateSession: () => {
        queryClient.invalidateQueries({ queryKey: ["session"] });
    },

    // Smart invalidation based on mutation type
    invalidateAfterSystemChange: () => {
        queryClient.invalidateQueries({
            predicate: (query) => {
                const key = query.queryKey[0];
                return ["system", "lime-utils", "changes-need-reboot"].includes(
                    key
                );
            },
        });
    },

    invalidateAfterNetworkChange: () => {
        queryClient.invalidateQueries({
            predicate: (query) => {
                const key = query.queryKey[0];
                return [
                    "lime-utils",
                    "iwinfo",
                    "check-internet",
                    "bat-hosts",
                ].includes(key);
            },
        });
    },
});
