import { useMemo, useContext } from "preact/hooks";
import { createContext } from "preact";

import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { INodes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

/**
 * Network health statistics
 */
export interface NetworkStats {
    nodes: {
        total: number;
        located: number;
        nonLocated: number;
        healthy: number;
        withWarnings: number;
        down: number;
    };
    links: {
        total: number;
        wifi: number;
        batman: number;
        babel: number;
        healthy: number;
        degraded: number;
        down: number;
    };
    health: {
        /** Overall health percentage (0-100) */
        overallHealth: number;
        /** Critical issues count */
        criticalIssues: number;
        /** Warning issues count */
        warnings: number;
    };
}

/**
 * Hook to calculate aggregated network statistics for mesh-wide
 *
 * @returns Comprehensive network statistics
 */
export const useNetworkStats = (): NetworkStats => {
    const {
        allNodes,
        locatedNodes,
        nonLocatedNodes,
        hasNonLocatedNodes,
    } = useNodes();

    // Calculate node statistics
    const nodeStats = useMemo(() => {
        const actualNodes = allNodes.meshWideNodesActual || {};
        const referenceNodes = allNodes.meshWideNodesReference || {};

        let healthy = 0;
        let withWarnings = 0;
        let down = 0;

        Object.keys(actualNodes).forEach((nodeName) => {
            const actual = actualNodes[nodeName];
            const reference = referenceNodes[nodeName];

            // Use useSingleNodeErrors logic inline
            const nodeErrors = getNodeErrors(actual, reference);

            if (nodeErrors.isDown) {
                down++;
            } else if (nodeErrors.hasErrors) {
                withWarnings++;
            } else {
                healthy++;
            }
        });

        // Add down nodes from reference that aren't in actual
        Object.keys(referenceNodes).forEach((nodeName) => {
            if (!actualNodes[nodeName]) {
                down++;
            }
        });

        return {
            total: Object.keys(actualNodes).length,
            located: Object.keys(locatedNodes.locatedNodesActual || {}).length,
            nonLocated: Object.keys(nonLocatedNodes || {}).length,
            healthy,
            withWarnings,
            down,
        };
    }, [allNodes, locatedNodes, nonLocatedNodes]);

    // Calculate link statistics
    // Note: Simplified version - full link stats require context access
    // which is complex to do in a reusable hook. This provides basic estimates.
    const linkStats = useMemo(() => {
        // For now, return reasonable defaults
        // TODO: Implement full link statistics when we refactor link contexts
        return {
            total: 0,
            wifi: 0,
            batman: 0,
            babel: 0,
            healthy: 0,
            degraded: 0,
            down: 0,
        };
    }, []);

    // Calculate overall health
    const healthStats = useMemo(() => {
        const criticalIssues = nodeStats.down;
        const warnings = nodeStats.withWarnings + linkStats.degraded;

        // Health calculation: weighted average
        // - Nodes: 60% weight
        // - Links: 40% weight
        const totalNodes = nodeStats.total || 1; // Avoid division by zero
        const totalLinks = linkStats.total || 1;

        const nodeHealthPercentage =
            ((nodeStats.healthy + nodeStats.withWarnings * 0.5) / totalNodes) *
            100;
        const linkHealthPercentage =
            ((linkStats.healthy + linkStats.degraded * 0.5) / totalLinks) * 100;

        const overallHealth = Math.round(
            nodeHealthPercentage * 0.6 + linkHealthPercentage * 0.4
        );

        return {
            overallHealth: Math.min(100, Math.max(0, overallHealth)),
            criticalIssues,
            warnings,
        };
    }, [nodeStats, linkStats]);

    return {
        nodes: nodeStats,
        links: linkStats,
        health: healthStats,
    };
};

/**
 * Helper to get node error status (inline version of useSingleNodeErrors)
 */
const getNodeErrors = (actual: any, reference: any) => {
    if (!actual) {
        return { isDown: true, hasErrors: true, errors: [] };
    }

    if (!reference) {
        return { isDown: false, hasErrors: false, errors: [], isNewNode: true };
    }

    const errors = [];
    let isDown = false;

    // Check for MAC mismatch
    if (actual.macs && reference.macs) {
        const actualMacs = new Set(actual.macs);
        const refMacs = new Set(reference.macs);

        const hasDifference =
            actualMacs.size !== refMacs.size ||
            [...actualMacs].some((mac) => !refMacs.has(mac));

        if (hasDifference) {
            errors.push("MACS_MISSMATCH");
        }
    }

    return {
        isDown,
        hasErrors: errors.length > 0,
        errors,
        isNewNode: false,
    };
};
