import { Trans } from "@lingui/macro";

import { useNetworkStats } from "plugins/lime-plugin-mesh-wide/src/hooks/useNetworkStats";

/**
 * Summary card component for displaying a metric
 */
const SummaryCard = ({
    icon,
    label,
    value,
    subtitle,
    color = "primary",
}: {
    icon: string;
    label: any; // Can be string or Trans component
    value: number | string;
    subtitle?: string;
    color?: "primary" | "success" | "warning" | "danger";
}) => {
    const colorClasses = {
        primary: "bg-primary-card border-primary-dark text-primary-dark",
        success: "bg-green-50 border-green-600 text-green-600",
        warning: "bg-yellow-50 border-yellow-600 text-yellow-600",
        danger: "bg-red-50 border-red-600 text-red-600",
    };

    return (
        <div
            className={`flex-1 min-w-[150px] border-2 rounded-lg p-4 ${colorClasses[color]}`}
        >
            <div className="flex flex-col items-center text-center gap-2">
                <div className="text-4xl">{icon}</div>
                <div className="text-5xl font-bold">{value}</div>
                <div className="text-xl font-semibold">{label}</div>
                {subtitle && (
                    <div className="text-sm opacity-75">{subtitle}</div>
                )}
            </div>
        </div>
    );
};

/**
 * Network summary section showing key metrics in cards
 */
export const NetworkSummary = () => {
    const stats = useNetworkStats();

    // Determine overall health color
    const getHealthColor = (health: number) => {
        if (health >= 80) return "success";
        if (health >= 60) return "warning";
        return "danger";
    };

    return (
        <div className="flex flex-col gap-4 px-4 py-6">
            <h2 className="text-3xl font-bold">
                <Trans>Network Overview</Trans>
            </h2>

            <div className="flex flex-wrap gap-4 justify-center">
                {/* Nodes summary */}
                <SummaryCard
                    icon="📡"
                    label={<Trans>Nodes</Trans>}
                    value={stats.nodes.total}
                    subtitle={
                        stats.nodes.nonLocated > 0
                            ? `${stats.nodes.nonLocated} without location`
                            : undefined
                    }
                    color="primary"
                />

                {/* Links summary */}
                <SummaryCard
                    icon="🔗"
                    label={<Trans>Links</Trans>}
                    value={stats.links.total}
                    subtitle={`${stats.links.wifi}W ${stats.links.batman}B ${stats.links.babel}Ba`}
                    color="primary"
                />

                {/* Health summary */}
                <SummaryCard
                    icon="❤️"
                    label={<Trans>Health</Trans>}
                    value={`${stats.health.overallHealth}%`}
                    subtitle={
                        stats.health.criticalIssues > 0 ||
                        stats.health.warnings > 0
                            ? `${stats.health.criticalIssues} critical, ${stats.health.warnings} warnings`
                            : "All systems normal"
                    }
                    color={getHealthColor(stats.health.overallHealth)}
                />
            </div>

            {/* Detailed breakdown */}
            <div className="flex flex-wrap gap-6 justify-around mt-4 text-center">
                <div className="flex flex-col">
                    <div className="text-xl font-bold text-green-600">
                        ✅ {stats.nodes.healthy}
                    </div>
                    <div className="text-sm">
                        <Trans>Healthy Nodes</Trans>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="text-xl font-bold text-yellow-600">
                        ⚠️ {stats.nodes.withWarnings}
                    </div>
                    <div className="text-sm">
                        <Trans>Nodes with Warnings</Trans>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="text-xl font-bold text-red-600">
                        ❌ {stats.nodes.down}
                    </div>
                    <div className="text-sm">
                        <Trans>Nodes Down</Trans>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="text-xl font-bold text-green-600">
                        ✅ {stats.links.healthy}
                    </div>
                    <div className="text-sm">
                        <Trans>Healthy Links</Trans>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="text-xl font-bold text-yellow-600">
                        ⚠️ {stats.links.degraded}
                    </div>
                    <div className="text-sm">
                        <Trans>Degraded Links</Trans>
                    </div>
                </div>
            </div>
        </div>
    );
};
