import { Trans } from "@lingui/macro";
import { useMemo, useState } from "preact/hooks";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { NodeCard } from "plugins/lime-plugin-mesh-wide/src/views/OfflineView/components/NodeCard";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

/**
 * List of all nodes with search and filter
 */
export const NodesList = () => {
    const { allNodes } = useNodes();
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<
        "all" | "healthy" | "warning" | "down"
    >("all");

    const actualNodes = allNodes.meshWideNodesActual || {};
    const referenceNodes = allNodes.meshWideNodesReference || {};

    // Combine and filter nodes
    const nodesList = useMemo(() => {
        const nodes = Object.keys(actualNodes).map((nodeName) => ({
            name: nodeName,
            actual: actualNodes[nodeName],
            reference: referenceNodes[nodeName],
        }));

        // Add down nodes from reference
        Object.keys(referenceNodes).forEach((nodeName) => {
            if (!actualNodes[nodeName]) {
                nodes.push({
                    name: nodeName,
                    actual: null,
                    reference: referenceNodes[nodeName],
                });
            }
        });

        return nodes;
    }, [actualNodes, referenceNodes]);

    // Filter nodes based on search and status
    const filteredNodes = useMemo(() => {
        return nodesList.filter((node) => {
            // Search filter
            if (
                searchTerm &&
                !node.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                return false;
            }

            // Status filter
            if (filterStatus !== "all") {
                const isDown = !node.actual;
                const hasWarnings =
                    node.actual &&
                    node.reference &&
                    JSON.stringify(node.actual.macs) !==
                        JSON.stringify(node.reference.macs);

                if (filterStatus === "down" && !isDown) return false;
                if (filterStatus === "warning" && !hasWarnings) return false;
                if (filterStatus === "healthy" && (isDown || hasWarnings))
                    return false;
            }

            return true;
        });
    }, [nodesList, searchTerm, filterStatus]);

    const nodeIcon = (
        <svg
            className={IconsClassName}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
    );

    return (
        <Section className="border border-primary-dark rounded-md mx-4 mb-6">
            <div
                className="cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <SectionTitle icon={nodeIcon}>
                    <div className="flex items-center justify-between w-full pr-6">
                        <span>
                            <Trans>
                                Nodes ({filteredNodes.length}/{nodesList.length}
                                )
                            </Trans>
                        </span>
                        <span className="text-2xl">
                            {isExpanded ? "▼" : "▶"}
                        </span>
                    </div>
                </SectionTitle>
            </div>

            {isExpanded && (
                <div className="px-6 pb-6">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search nodes..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.currentTarget.value)
                            }
                            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        {/* Status filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(
                                    e.currentTarget.value as
                                        | "all"
                                        | "healthy"
                                        | "warning"
                                        | "down"
                                )
                            }
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">
                                <Trans>All Status</Trans>
                            </option>
                            <option value="healthy">
                                <Trans>Healthy</Trans>
                            </option>
                            <option value="warning">
                                <Trans>Warning</Trans>
                            </option>
                            <option value="down">
                                <Trans>Down</Trans>
                            </option>
                        </select>
                    </div>

                    {/* Nodes list */}
                    {filteredNodes.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Trans>No nodes found</Trans>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filteredNodes.map((node) => (
                                <NodeCard
                                    key={node.name}
                                    name={node.name}
                                    actual={node.actual}
                                    reference={node.reference}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Section>
    );
};
