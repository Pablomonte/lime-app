/**
 * Performance monitoring utilities for TanStack Query operations
 * Tracks query performance, cache efficiency, and identifies bottlenecks
 */

/**
 * Performance metrics collector
 */
class QueryPerformanceMonitor {
    constructor() {
        this.metrics = {
            queries: new Map(),
            mutations: new Map(),
            cacheStats: {
                hits: 0,
                misses: 0,
                invalidations: 0,
            },
            slowQueries: new Set(),
        };

        this.thresholds = {
            slowQueryMs: 2000, // Queries slower than 2s
            cacheHitRatio: 0.8, // Target 80% cache hit ratio
        };

        // Start monitoring if in development
        if (process.env.NODE_ENV === "development") {
            this.startMonitoring();
        }
    }

    /**
     * Track query performance
     */
    trackQuery(queryKey, startTime, endTime, status, fromCache = false) {
        const duration = endTime - startTime;
        const keyString = Array.isArray(queryKey)
            ? queryKey.join(".")
            : String(queryKey);

        // Update query metrics
        if (!this.metrics.queries.has(keyString)) {
            this.metrics.queries.set(keyString, {
                totalCalls: 0,
                totalDuration: 0,
                avgDuration: 0,
                maxDuration: 0,
                minDuration: Infinity,
                errors: 0,
                cacheHits: 0,
                cacheMisses: 0,
                lastCalled: null,
            });
        }

        const queryStats = this.metrics.queries.get(keyString);
        queryStats.totalCalls++;
        queryStats.totalDuration += duration;
        queryStats.avgDuration =
            queryStats.totalDuration / queryStats.totalCalls;
        queryStats.maxDuration = Math.max(queryStats.maxDuration, duration);
        queryStats.minDuration = Math.min(queryStats.minDuration, duration);
        queryStats.lastCalled = Date.now();

        if (status === "error") {
            queryStats.errors++;
        }

        // Track cache performance
        if (fromCache) {
            queryStats.cacheHits++;
            this.metrics.cacheStats.hits++;
        } else {
            queryStats.cacheMisses++;
            this.metrics.cacheStats.misses++;
        }

        // Flag slow queries
        if (duration > this.thresholds.slowQueryMs) {
            this.metrics.slowQueries.add(keyString);
            console.warn(
                `🐌 Slow query detected: ${keyString} (${duration}ms)`
            );
        }
    }

    /**
     * Track mutation performance
     */
    trackMutation(mutationKey, duration, status) {
        const keyString = String(mutationKey);

        if (!this.metrics.mutations.has(keyString)) {
            this.metrics.mutations.set(keyString, {
                totalCalls: 0,
                totalDuration: 0,
                avgDuration: 0,
                errors: 0,
                successes: 0,
            });
        }

        const mutationStats = this.metrics.mutations.get(keyString);
        mutationStats.totalCalls++;
        mutationStats.totalDuration += duration;
        mutationStats.avgDuration =
            mutationStats.totalDuration / mutationStats.totalCalls;

        if (status === "error") {
            mutationStats.errors++;
        } else if (status === "success") {
            mutationStats.successes++;
        }
    }

    /**
     * Track cache invalidations
     */
    trackInvalidation(pattern) {
        this.metrics.cacheStats.invalidations++;
        console.log(`♻️ Cache invalidated: ${pattern}`);
    }

    /**
     * Get performance report
     */
    getReport() {
        const totalQueries =
            this.metrics.cacheStats.hits + this.metrics.cacheStats.misses;
        const cacheHitRatio =
            totalQueries > 0 ? this.metrics.cacheStats.hits / totalQueries : 0;

        // Top slow queries
        const slowQueries = Array.from(this.metrics.queries.entries())
            .filter(([key]) => this.metrics.slowQueries.has(key))
            .sort(([, a], [, b]) => b.avgDuration - a.avgDuration)
            .slice(0, 10);

        // Most called queries
        const popularQueries = Array.from(this.metrics.queries.entries())
            .sort(([, a], [, b]) => b.totalCalls - a.totalCalls)
            .slice(0, 10);

        // Queries with high error rates
        const errorProneQueries = Array.from(this.metrics.queries.entries())
            .filter(([, stats]) => stats.errors > 0)
            .sort(
                ([, a], [, b]) =>
                    b.errors / b.totalCalls - a.errors / a.totalCalls
            )
            .slice(0, 10);

        return {
            summary: {
                totalQueries: this.metrics.queries.size,
                totalMutations: this.metrics.mutations.size,
                cacheHitRatio: Math.round(cacheHitRatio * 100),
                slowQueriesCount: this.metrics.slowQueries.size,
                totalInvalidations: this.metrics.cacheStats.invalidations,
            },
            slowQueries: slowQueries.map(([key, stats]) => ({
                query: key,
                avgDuration: Math.round(stats.avgDuration),
                maxDuration: Math.round(stats.maxDuration),
                totalCalls: stats.totalCalls,
            })),
            popularQueries: popularQueries.map(([key, stats]) => ({
                query: key,
                totalCalls: stats.totalCalls,
                avgDuration: Math.round(stats.avgDuration),
                cacheHitRatio:
                    Math.round(
                        (stats.cacheHits /
                            (stats.cacheHits + stats.cacheMisses)) *
                            100
                    ) || 0,
            })),
            errorProneQueries: errorProneQueries.map(([key, stats]) => ({
                query: key,
                errorRate: Math.round((stats.errors / stats.totalCalls) * 100),
                totalErrors: stats.errors,
                totalCalls: stats.totalCalls,
            })),
        };
    }

    /**
     * Print performance report to console
     */
    printReport() {
        const report = this.getReport();

        console.group("📊 Query Performance Report");

        console.log("Summary:", report.summary);

        if (report.slowQueries.length > 0) {
            console.group("🐌 Slowest Queries");
            report.slowQueries.forEach((q) =>
                console.log(
                    `${q.query}: ${q.avgDuration}ms avg (max: ${q.maxDuration}ms, calls: ${q.totalCalls})`
                )
            );
            console.groupEnd();
        }

        if (report.errorProneQueries.length > 0) {
            console.group("❌ Error-Prone Queries");
            report.errorProneQueries.forEach((q) =>
                console.log(
                    `${q.query}: ${q.errorRate}% error rate (${q.totalErrors}/${q.totalCalls})`
                )
            );
            console.groupEnd();
        }

        console.group("📈 Most Popular Queries");
        report.popularQueries
            .slice(0, 5)
            .forEach((q) =>
                console.log(
                    `${q.query}: ${q.totalCalls} calls, ${q.avgDuration}ms avg, ${q.cacheHitRatio}% cache hit`
                )
            );
        console.groupEnd();

        console.groupEnd();
    }

    /**
     * Start automatic monitoring
     */
    startMonitoring() {
        // Print report every 60 seconds in development
        this.reportInterval = setInterval(() => {
            if (this.metrics.queries.size > 0) {
                this.printReport();
            }
        }, 60000);
    }

    /**
     * Stop monitoring
     */
    stopMonitoring() {
        if (this.reportInterval) {
            clearInterval(this.reportInterval);
        }
    }

    /**
     * Reset all metrics
     */
    reset() {
        this.metrics = {
            queries: new Map(),
            mutations: new Map(),
            cacheStats: { hits: 0, misses: 0, invalidations: 0 },
            slowQueries: new Set(),
        };
    }
}

// Global performance monitor instance
export const performanceMonitor = new QueryPerformanceMonitor();

/**
 * Query wrapper with performance tracking
 */
export const withPerformanceTracking = (queryClient) => {
    const originalQuery = queryClient.fetchQuery.bind(queryClient);
    const originalInvalidate = queryClient.invalidateQueries.bind(queryClient);

    // Wrap fetchQuery with performance tracking
    queryClient.fetchQuery = async (...args) => {
        const [queryKey] = args;
        const startTime = performance.now();

        try {
            const result = await originalQuery(...args);
            const endTime = performance.now();
            performanceMonitor.trackQuery(
                queryKey,
                startTime,
                endTime,
                "success",
                false
            );
            return result;
        } catch (error) {
            const endTime = performance.now();
            performanceMonitor.trackQuery(
                queryKey,
                startTime,
                endTime,
                "error",
                false
            );
            throw error;
        }
    };

    // Wrap invalidateQueries with tracking
    queryClient.invalidateQueries = (...args) => {
        const [pattern] = args;
        performanceMonitor.trackInvalidation(String(pattern));
        return originalInvalidate(...args);
    };

    return queryClient;
};

/**
 * React DevTools integration (development only)
 */
export const QueryPerformanceDevTools = () => {
    if (process.env.NODE_ENV !== "development") {
        return null;
    }

    // Add to global scope for easy access in devtools
    if (typeof window !== "undefined") {
        // @ts-ignore - Adding custom property to window for development
        window.queryPerformance = {
            getReport: () => performanceMonitor.getReport(),
            printReport: () => performanceMonitor.printReport(),
            reset: () => performanceMonitor.reset(),
        };
    }

    return null;
};
