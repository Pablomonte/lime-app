/**
 * Smart query invalidation patterns for maintaining data consistency
 * Defines relationships between mutations and the queries they should invalidate
 */

import { performanceMonitor } from "./performanceMonitor";

/**
 * Query dependency relationships
 * Maps mutation actions to the queries that should be invalidated
 */
export const QUERY_DEPENDENCIES = {
    // System configuration changes
    'system-config-change': [
        'lime-utils', // Community settings, wifi data
        'system', // Board info
        'changes-need-reboot', // Reboot requirements
    ],
    
    // Network configuration changes
    'network-config-change': [
        'lime-utils', // Mesh interfaces, community settings
        'iwinfo', // Association lists, mesh interfaces
        'check-internet', // Internet connectivity
        'bat-hosts', // Batman hosts
        'lime-location', // Network topology
    ],
    
    // WiFi/Radio changes
    'wifi-config-change': [
        'lime-utils', // WiFi data, mesh interfaces
        'iwinfo', // Association lists
        'lime-fbw', // First boot wizard status
    ],
    
    // Firmware operations
    'firmware-change': [
        'lime-utils', // Upgrade info
        'eupgrade', // Version info, download status
        'changes-need-reboot', // Reboot requirements
    ],
    
    // User authentication
    'auth-change': [
        'session', // Session status
    ],
    
    // Pirania portal changes
    'pirania-change': [
        'pirania', // Portal config, vouchers, content
        'lime-utils', // Community settings (portal integration)
    ],
    
    // Location changes
    'location-change': [
        'lime-location', // Node location, network topology
    ],
    
    // Remote support changes
    'support-change': [
        'tmate', // Support session status
    ],
    
    // Hotspot changes
    'hotspot-change': [
        'lime-utils', // WiFi data
        'iwinfo', // Interface status
    ],
};

/**
 * Time-based invalidation patterns
 * Some data becomes stale after certain time periods
 */
export const TIME_BASED_INVALIDATION = {
    // Network status should be refreshed periodically
    'network-status': {
        interval: 5 * 60 * 1000, // 5 minutes
        patterns: [
            'check-internet',
            'iwinfo',
            'bat-hosts',
        ],
    },
    
    // Metrics data for monitoring
    'metrics-refresh': {
        interval: 2 * 60 * 1000, // 2 minutes
        patterns: [
            'lime-metrics',
        ],
    },
    
    // Session validation
    'session-check': {
        interval: 15 * 60 * 1000, // 15 minutes
        patterns: [
            'session',
        ],
    },
};

/**
 * Smart invalidation helper
 */
export class SmartInvalidator {
    constructor(queryClient) {
        this.queryClient = queryClient;
        this.timers = new Map();
        
        // Start time-based invalidation
        this.startTimeBasedInvalidation();
    }
    
    /**
     * Invalidate queries based on mutation type
     */
    invalidateByMutationType(mutationType, additionalPatterns = []) {
        const patterns = QUERY_DEPENDENCIES[mutationType] || [];
        const allPatterns = [...patterns, ...additionalPatterns];
        
        allPatterns.forEach(pattern => {
            this.queryClient.invalidateQueries({
                predicate: (query) => {
                    const queryKey = query.queryKey[0];
                    return queryKey.includes(pattern) || queryKey === pattern;
                }
            });
            
            // Track for performance monitoring
            performanceMonitor.trackInvalidation(`${mutationType}:${pattern}`);
        });
        
        console.log(`🔄 Invalidated queries for mutation type: ${mutationType}`, allPatterns);
    }
    
    /**
     * Selective invalidation based on specific data changes
     */
    invalidateRelated(primaryQueryKey, relatedPatterns = []) {
        // Always invalidate the primary query
        this.queryClient.invalidateQueries({ queryKey: primaryQueryKey });
        
        // Invalidate related patterns
        relatedPatterns.forEach(pattern => {
            this.queryClient.invalidateQueries({
                predicate: (query) => {
                    const queryKey = query.queryKey[0];
                    return queryKey.includes(pattern);
                }
            });
        });
        
        performanceMonitor.trackInvalidation(`related:${primaryQueryKey.join('.')}`);
    }
    
    /**
     * Bulk invalidation for major system changes
     */
    invalidateAll(except = []) {
        const exceptSet = new Set(except);
        
        this.queryClient.invalidateQueries({
            predicate: (query) => {
                const queryKey = query.queryKey[0];
                return !exceptSet.has(queryKey);
            }
        });
        
        performanceMonitor.trackInvalidation('bulk-invalidation');
        console.log('🔄 Bulk invalidation performed', { except });
    }
    
    /**
     * Smart invalidation after successful mutations
     */
    onMutationSuccess(mutationKey, data, variables) {
        // Extract mutation type from key
        const mutationType = this.getMutationTypeFromKey(mutationKey);
        
        // Apply smart invalidation
        if (mutationType) {
            this.invalidateByMutationType(mutationType);
        }
        
        // Special cases for specific mutations
        this.handleSpecialCases(mutationKey, data, variables);
    }
    
    /**
     * Extract mutation type from mutation key
     */
    getMutationTypeFromKey(mutationKey) {
        const keyStr = Array.isArray(mutationKey) ? mutationKey[0] : String(mutationKey);
        
        // Map specific mutation keys to types
        if (keyStr.includes('lime-utils') || keyStr.includes('community')) {
            return 'system-config-change';
        }
        if (keyStr.includes('wifi') || keyStr.includes('iwinfo')) {
            return 'wifi-config-change';
        }
        if (keyStr.includes('fbw') || keyStr.includes('network')) {
            return 'network-config-change';
        }
        if (keyStr.includes('firmware') || keyStr.includes('eupgrade')) {
            return 'firmware-change';
        }
        if (keyStr.includes('session') || keyStr.includes('login')) {
            return 'auth-change';
        }
        if (keyStr.includes('pirania')) {
            return 'pirania-change';
        }
        if (keyStr.includes('location') || keyStr.includes('lime-location')) {
            return 'location-change';
        }
        if (keyStr.includes('tmate') || keyStr.includes('support')) {
            return 'support-change';
        }
        if (keyStr.includes('hotspot')) {
            return 'hotspot-change';
        }
        
        return null;
    }
    
    /**
     * Handle special invalidation cases
     */
    handleSpecialCases(mutationKey, data, variables) {
        const keyStr = String(mutationKey);
        
        // FBW network creation should invalidate scan status
        if (keyStr.includes('fbw') && keyStr.includes('network')) {
            this.invalidateRelated(['lime-fbw', 'status'], ['lime-fbw', 'scan-status']);
        }
        
        // Pirania voucher operations
        if (keyStr.includes('pirania') && keyStr.includes('voucher')) {
            this.invalidateRelated(['pirania', 'vouchers'], ['pirania', 'config']);
        }
        
        // Password changes should invalidate session
        if (keyStr.includes('password') || keyStr.includes('auth')) {
            this.invalidateRelated(['session', 'get'], []);
        }
        
        // Hostname changes affect multiple queries
        if (keyStr.includes('hostname') || keyStr.includes('system')) {
            this.invalidateByMutationType('system-config-change');
        }
    }
    
    /**
     * Start time-based invalidation timers
     */
    startTimeBasedInvalidation() {
        Object.entries(TIME_BASED_INVALIDATION).forEach(([name, config]) => {
            const timer = setInterval(() => {
                config.patterns.forEach(pattern => {
                    this.queryClient.invalidateQueries({
                        predicate: (query) => {
                            const queryKey = query.queryKey[0];
                            return queryKey.includes(pattern);
                        }
                    });
                });
                
                performanceMonitor.trackInvalidation(`time-based:${name}`);
            }, config.interval);
            
            this.timers.set(name, timer);
        });
    }
    
    /**
     * Stop time-based invalidation
     */
    stopTimeBasedInvalidation() {
        this.timers.forEach(timer => clearInterval(timer));
        this.timers.clear();
    }
    
    /**
     * Cleanup
     */
    destroy() {
        this.stopTimeBasedInvalidation();
    }
}

/**
 * Create invalidation helper for a query client
 */
export const createInvalidationHelper = (queryClient) => {
    return new SmartInvalidator(queryClient);
};

/**
 * React hook for accessing invalidation helpers
 */
export const useSmartInvalidation = () => {
    // This would be used with the query client from context
    // Implementation depends on how the query client is provided
    return {
        invalidateByType: (type, patterns) => {
            // Implementation would use the context query client
            console.log('Smart invalidation:', type, patterns);
        }
    };
};