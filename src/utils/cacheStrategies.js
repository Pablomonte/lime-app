/**
 * Smart caching strategies for different types of data
 * Based on data volatility and usage patterns
 */

/**
 * Cache durations in milliseconds
 */
export const CACHE_DURATIONS = {
    // Static data that rarely changes
    STATIC: 30 * 60 * 1000, // 30 minutes
    
    // System configuration that changes occasionally  
    SYSTEM_CONFIG: 10 * 60 * 1000, // 10 minutes
    
    // Network status that changes moderately
    NETWORK_STATUS: 2 * 60 * 1000, // 2 minutes
    
    // Real-time data that changes frequently
    REALTIME: 30 * 1000, // 30 seconds
    
    // Critical data that must be fresh
    CRITICAL: 0, // Always fresh
    
    // Session data (long-lived but security-sensitive)
    SESSION: 15 * 60 * 1000, // 15 minutes
};

/**
 * Cache strategies by data category
 */
export const CACHE_STRATEGIES = {
    // Static system information
    static: {
        staleTime: CACHE_DURATIONS.STATIC,
        cacheTime: CACHE_DURATIONS.STATIC * 2, // Keep in memory longer
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    },
    
    // System configuration
    systemConfig: {
        staleTime: CACHE_DURATIONS.SYSTEM_CONFIG,
        cacheTime: CACHE_DURATIONS.SYSTEM_CONFIG * 2,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true, // Refresh on network reconnect
    },
    
    // Network and connectivity status
    networkStatus: {
        staleTime: CACHE_DURATIONS.NETWORK_STATUS,
        cacheTime: CACHE_DURATIONS.NETWORK_STATUS * 1.5,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    },
    
    // Real-time monitoring data
    realtime: {
        staleTime: CACHE_DURATIONS.REALTIME,
        cacheTime: CACHE_DURATIONS.REALTIME * 2,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: CACHE_DURATIONS.REALTIME * 2, // Auto-refresh
    },
    
    // Critical data that must always be fresh
    critical: {
        staleTime: CACHE_DURATIONS.CRITICAL,
        cacheTime: CACHE_DURATIONS.CRITICAL,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    },
    
    // Session and authentication
    session: {
        staleTime: CACHE_DURATIONS.SESSION,
        cacheTime: CACHE_DURATIONS.SESSION * 2,
        refetchOnMount: false,
        refetchOnWindowFocus: true, // Check auth on focus
        refetchOnReconnect: true,
    },
    
    // Test environment - disable caching for predictable tests
    test: {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        retry: false,
    },
};

/**
 * Query key patterns mapped to cache strategies
 */
export const QUERY_CACHE_MAP = {
    // Static system information
    board: 'static',
    communitySettings: 'static',
    
    // System configuration  
    upgradeInfo: 'systemConfig',
    newVersion: 'systemConfig',
    wifiData: 'systemConfig',
    adminWifiData: 'systemConfig',
    
    // Network status
    internet: 'networkStatus',
    meshIfaces: 'networkStatus',
    batHost: 'networkStatus',
    
    // Real-time monitoring
    assocList: 'realtime',
    metricsForIp: 'realtime',
    metricsGateway: 'realtime',
    metricsPath: 'realtime',
    metricsLossForIp: 'realtime',
    
    // Critical operations
    changes: 'critical',
    downloadStatus: 'critical',
    fbwStatus: 'critical',
    fbwScanStatus: 'critical',
    
    // Session management
    session: 'session',
    
    // Location data (moderate refresh)
    locateLocation: 'systemConfig',
    locateNodesAndLinks: 'networkStatus',
    locateLeaflet: 'static',
    
    // Pirania portal data
    piraniaPortalConfig: 'systemConfig',
    piraniaPortalContent: 'systemConfig',
    piraniaVouchers: 'networkStatus',
    piraniaLogoCompression: 'static',
    
    // Remote support
    tmateSession: 'networkStatus',
    
    // Hotspot functionality
    hotspotStatus: 'networkStatus',
};

/**
 * Get cache strategy for a query key
 * @param {string} queryKeyName - The query key name
 * @returns {object} Cache strategy configuration
 */
export const getCacheStrategy = (queryKeyName) => {
    // Use test strategy in test environment
    if (process.env.NODE_ENV === "test") {
        return CACHE_STRATEGIES.test;
    }
    
    // Find matching strategy
    const strategyName = QUERY_CACHE_MAP[queryKeyName];
    if (strategyName && CACHE_STRATEGIES[strategyName]) {
        return CACHE_STRATEGIES[strategyName];
    }
    
    // Default to network status for unknown queries
    return CACHE_STRATEGIES.networkStatus;
};

/**
 * Create optimized query configuration
 * @param {string} queryKeyName - The query key name  
 * @param {object} customOptions - Custom options to override defaults
 * @returns {object} Optimized query configuration
 */
export const createOptimizedQueryConfig = (queryKeyName, customOptions = {}) => {
    const strategy = getCacheStrategy(queryKeyName);
    
    return {
        ...strategy,
        ...customOptions, // Allow custom overrides
    };
};