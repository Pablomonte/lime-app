/**
 * Test utilities for centralized queryKeys
 * This file provides helper functions to work with queryKeys in tests
 */
import queryCache from "./queryCache";
import { queryKeys } from "./queryKeys";

/**
 * Helper to set query data using centralized keys with proper state management
 * @param {string} keyName - The key name from queryKeys object
 * @param {*} data - The data to set
 * @param {...any} params - Parameters for parameterized keys
 */
export const setQueryData = (keyName, data, ...params) => {
    const keyFn = queryKeys[keyName];
    if (typeof keyFn !== "function") {
        throw new Error(`Query key '${keyName}' not found in queryKeys`);
    }

    const key = keyFn(...params);
    queryCache.setQueryData(key, data);

    // Also set as stale to prevent refetch during tests
    queryCache.setQueryDefaults(key, {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

/**
 * Helper to mock query with custom resolver
 * @param {string} keyName - The key name from queryKeys object
 * @param {function} queryFn - The mock query function
 * @param {...any} params - Parameters for parameterized keys
 */
export const mockQuery = (keyName, queryFn, ...params) => {
    const keyFn = queryKeys[keyName];
    if (typeof keyFn !== "function") {
        throw new Error(`Query key '${keyName}' not found in queryKeys`);
    }

    const key = keyFn(...params);
    queryCache.setQueryDefaults(key, {
        queryFn: () => queryFn(), // Wrap to match expected signature
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

/**
 * Helper to prefetch query data using centralized keys
 * @param {string} keyName - The key name from queryKeys object
 * @param {function} queryFn - The query function
 * @param {...any} params - Parameters for parameterized keys
 */
export const prefetchQuery = async (keyName, queryFn, ...params) => {
    const keyFn = queryKeys[keyName];
    if (typeof keyFn !== "function") {
        throw new Error(`Query key '${keyName}' not found in queryKeys`);
    }

    const key = keyFn(...params);
    await queryCache.prefetchQuery(key, () => queryFn());
};

/**
 * Clear all queries that match a pattern
 */
export const clearQueriesByPattern = (pattern) => {
    queryCache.clear(); // For simplicity, clear all in tests
};
