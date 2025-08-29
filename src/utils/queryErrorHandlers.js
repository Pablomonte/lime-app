/**
 * Centralized error handling utilities for queryKeys-based queries
 */
import {
    createOptionalQueryHandler,
    createQueryErrorHandler,
} from "./errorHandling";

/**
 * Error handlers for specific query patterns
 * Maps queryKey names to their appropriate error handling strategy
 */
export const queryErrorHandlers = {
    // Session queries - critical, but can gracefully degrade
    sessionCheck: createOptionalQueryHandler("sessionCheck", {
        session: false,
    }),

    // Core system queries - important but not critical
    changesNeedReboot: createOptionalQueryHandler("changesNeedReboot", false),
    firstBootWizard: createOptionalQueryHandler("firstBootWizard", {
        lock: false,
    }),

    // Firmware queries - can fail gracefully
    upgradeInfo: createOptionalQueryHandler("upgradeInfo", null),
    newVersion: createOptionalQueryHandler("newVersion", false),
    downloadStatus: createOptionalQueryHandler("downloadStatus", null),

    // FBW queries - optional functionality
    fbwStatus: createOptionalQueryHandler("fbwStatus", { lock: false }),
    fbwScanStatus: createOptionalQueryHandler("fbwScanStatus", { results: [] }),

    // Node admin queries - provide reasonable defaults
    wifiData: createOptionalQueryHandler("wifiData", []),
    adminWifiData: createOptionalQueryHandler("adminWifiData", []),
    hotspotStatus: createOptionalQueryHandler("hotspotStatus", null),

    // Remote support - optional feature
    tmateSession: createOptionalQueryHandler("tmateSession", null),

    // Pirania queries - graceful degradation
    piraniaPortalConfig: createOptionalQueryHandler("piraniaPortalConfig", {}),
    piraniaPortalContent: createOptionalQueryHandler(
        "piraniaPortalContent",
        ""
    ),
    piraniaVouchers: createOptionalQueryHandler("piraniaVouchers", []),
    piraniaLogoCompression: createOptionalQueryHandler(
        "piraniaLogoCompression",
        null
    ),

    // Location queries - map functionality can degrade
    locateLocation: createOptionalQueryHandler("locateLocation", {
        location: { lat: "0", lon: "0" },
        default: true,
    }),
    locateNodesAndLinks: createOptionalQueryHandler("locateNodesAndLinks", {
        nodes: [],
        links: [],
    }),
    locateLeaflet: createOptionalQueryHandler("locateLeaflet", null),

    // Metrics queries - monitoring can fail gracefully
    metricsForIp: (ip) =>
        createOptionalQueryHandler(`metricsForIp[${ip}]`, null),
    metricsGateway: createOptionalQueryHandler("metricsGateway", null),
    metricsPath: createOptionalQueryHandler("metricsPath", null),
    metricsLossForIp: (ip) =>
        createOptionalQueryHandler(`metricsLossForIp[${ip}]`, null),

    // Align queries - network diagnostics can degrade
    meshIfaces: createOptionalQueryHandler("meshIfaces", []),
    assocList: (iface) => createOptionalQueryHandler(`assocList[${iface}]`, []),
};

/**
 * Get error handler for a specific queryKey
 * @param {string} queryKeyName - The name of the queryKey
 * @param {...any} params - Parameters for parameterized queries
 * @returns {(err: unknown) => void} Error handler function
 */
export const getQueryErrorHandler = (queryKeyName, ...params) => {
    const handler = queryErrorHandlers[queryKeyName];

    if (!handler) {
        // Default fallback error handler
        return createQueryErrorHandler(queryKeyName);
    }

    // If handler is a function (parameterized), call it with params
    if (typeof handler === "function") {
        const parameterizedHandler = handler(...params);
        // Ensure it returns the correct function signature
        return (err) => {
            return parameterizedHandler(err);
        };
    }

    // Ensure handler has correct signature
    return (err) => {
        return handler(err);
    };
};
