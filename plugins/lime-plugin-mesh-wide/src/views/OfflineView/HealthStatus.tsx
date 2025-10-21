import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { WarningIcon } from "plugins/lime-plugin-mesh-wide/src/icons/warningIcon";
import { useMeshWideDataErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useMeshWideDataErrors";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { useNetworkStats } from "plugins/lime-plugin-mesh-wide/src/hooks/useNetworkStats";

/**
 * Health status section showing critical errors and warnings
 */
export const HealthStatus = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const stats = useNetworkStats();
    const { hasNonLocatedNodes, nonLocatedNodes } = useNodes();
    const { meshWideDataErrors, dataNotSetErrors } = useMeshWideDataErrors();

    const hasCriticalIssues = stats.health.criticalIssues > 0;
    const hasWarnings = stats.health.warnings > 0;
    const hasDataErrors =
        meshWideDataErrors.length > 0 || dataNotSetErrors.length > 0;
    const hasAnyIssues =
        hasCriticalIssues ||
        hasWarnings ||
        hasNonLocatedNodes ||
        hasDataErrors;

    if (!hasAnyIssues) {
        return (
            <Section className="border border-green-600 rounded-md mx-4 mb-6 bg-green-50">
                <SectionTitle
                    icon={<span className="text-green-600 text-5xl">✅</span>}
                >
                    <Trans>Network Health: All Systems Normal</Trans>
                </SectionTitle>
                <div className="px-6 pb-4 text-green-700">
                    <Trans>
                        All nodes are healthy and all links are functioning
                        correctly.
                    </Trans>
                </div>
            </Section>
        );
    }

    return (
        <Section
            className={`border-2 rounded-md mx-4 mb-6 ${
                hasCriticalIssues
                    ? "border-red-600 bg-red-50"
                    : "border-yellow-600 bg-yellow-50"
            }`}
        >
            <div
                className="cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <SectionTitle
                    icon={
                        <span
                            className={`${IconsClassName} ${
                                hasCriticalIssues
                                    ? "text-red-600"
                                    : "text-yellow-600"
                            }`}
                        >
                            <WarningIcon />
                        </span>
                    }
                >
                    <div className="flex items-center justify-between w-full pr-6">
                        <span>
                            <Trans>Network Health Status</Trans>
                        </span>
                        <span className="text-2xl">
                            {isExpanded ? "▼" : "▶"}
                        </span>
                    </div>
                </SectionTitle>
            </div>

            {isExpanded && (
                <div className="px-6 pb-4 flex flex-col gap-4">
                    {/* Summary */}
                    <div className="flex gap-4 text-lg font-semibold">
                        {hasCriticalIssues && (
                            <div className="text-red-600">
                                ❌ {stats.health.criticalIssues}{" "}
                                <Trans>Critical</Trans>
                            </div>
                        )}
                        {hasWarnings && (
                            <div className="text-yellow-600">
                                ⚠️ {stats.health.warnings}{" "}
                                <Trans>Warnings</Trans>
                            </div>
                        )}
                    </div>

                    {/* Critical: Nodes down */}
                    {stats.nodes.down > 0 && (
                        <div className="border-l-4 border-red-600 pl-4">
                            <div className="font-bold text-red-700">
                                <Trans>Nodes Down ({stats.nodes.down})</Trans>
                            </div>
                            <div className="text-sm text-red-600">
                                <Trans>
                                    These nodes are not responding or have been
                                    removed from the network.
                                </Trans>
                            </div>
                        </div>
                    )}

                    {/* Warning: Nodes with warnings */}
                    {stats.nodes.withWarnings > 0 && (
                        <div className="border-l-4 border-yellow-600 pl-4">
                            <div className="font-bold text-yellow-700">
                                <Trans>
                                    Nodes with Warnings (
                                    {stats.nodes.withWarnings})
                                </Trans>
                            </div>
                            <div className="text-sm text-yellow-600">
                                <Trans>
                                    These nodes have configuration mismatches or
                                    other non-critical issues.
                                </Trans>
                            </div>
                        </div>
                    )}

                    {/* Warning: Degraded links */}
                    {stats.links.degraded > 0 && (
                        <div className="border-l-4 border-yellow-600 pl-4">
                            <div className="font-bold text-yellow-700">
                                <Trans>
                                    Degraded Links ({stats.links.degraded})
                                </Trans>
                            </div>
                            <div className="text-sm text-yellow-600">
                                <Trans>
                                    WiFi links with weak signal (-60 to -75 dBm).
                                    Consider checking alignment.
                                </Trans>
                            </div>
                        </div>
                    )}

                    {/* Info: Non-located nodes */}
                    {hasNonLocatedNodes && (
                        <div className="border-l-4 border-blue-600 pl-4">
                            <div className="font-bold text-blue-700">
                                <Trans>
                                    Nodes Without Location (
                                    {Object.keys(nonLocatedNodes).length})
                                </Trans>
                            </div>
                            <div className="text-sm text-blue-600">
                                <Trans>
                                    These nodes don't have GPS coordinates set.
                                    They will appear in the list below but not on
                                    the map.
                                </Trans>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {Object.keys(nonLocatedNodes).map(
                                    (nodeName) => (
                                        <span
                                            key={nodeName}
                                            className="px-2 py-1 bg-blue-100 rounded text-sm"
                                        >
                                            {nodeName}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Data errors */}
                    {hasDataErrors && (
                        <div className="border-l-4 border-orange-600 pl-4">
                            <div className="font-bold text-orange-700">
                                <Trans>
                                    Shared State Errors (
                                    {meshWideDataErrors.length +
                                        dataNotSetErrors.length}
                                    )
                                </Trans>
                            </div>
                            <div className="text-sm text-orange-600">
                                <Trans>
                                    Some shared state data could not be loaded or
                                    is not set. Check if shared-state packages are
                                    properly installed.
                                </Trans>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Section>
    );
};
