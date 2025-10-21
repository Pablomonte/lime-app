import { Trans } from "@lingui/macro";
import { useCallback } from "react";

import { StatusBadge } from "plugins/lime-plugin-mesh-wide/src/views/OfflineView/components/StatusBadge";
import { useSingleNodeErrors } from "plugins/lime-plugin-mesh-wide/src/hooks/useSingleNodeErrors";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

interface NodeCardProps {
    name: string;
    actual: INodeInfo;
    reference?: INodeInfo;
}

/**
 * Card component for displaying a single node in the list
 */
export const NodeCard = ({ name, actual, reference }: NodeCardProps) => {
    const { setData: setSelectedFeature } = useSelectedMapFeature();
    const { errors, isDown, isNewNode } = useSingleNodeErrors({
        actual,
        reference,
    });

    // Determine status
    const getStatus = () => {
        if (isDown) return "down";
        if (isNewNode) return "new";
        if (errors && errors.length > 0) return "warning";
        return "healthy";
    };

    const status = getStatus();

    // Handle click to show details
    const handleDetailsClick = useCallback(() => {
        setSelectedFeature({
            id: name,
            type: "node",
            feature: {
                actual,
                reference,
                name,
            },
        });
    }, [name, actual, reference, setSelectedFeature]);

    return (
        <div className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                {/* Node info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold truncate">{name}</h3>
                        <StatusBadge status={status} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {!isDown && (
                            <>
                                <div>
                                    <span className="text-gray-600">
                                        <Trans>IPv4:</Trans>
                                    </span>{" "}
                                    <span className="font-mono">
                                        {actual.ipv4}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        <Trans>Device:</Trans>
                                    </span>{" "}
                                    <span>{actual.device}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        <Trans>Firmware:</Trans>
                                    </span>{" "}
                                    <span className="truncate">
                                        {actual.firmware_version}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        <Trans>MACs:</Trans>
                                    </span>{" "}
                                    <span>{actual.macs?.length || 0}</span>
                                </div>
                            </>
                        )}
                        {isDown && reference && (
                            <div className="col-span-2 text-red-600">
                                <Trans>Node is down or unreachable</Trans>
                            </div>
                        )}
                    </div>

                    {/* Errors */}
                    {errors && errors.length > 0 && (
                        <div className="mt-2 text-sm text-yellow-600">
                            <Trans>
                                {errors.length} issue(s) detected
                            </Trans>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleDetailsClick}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors whitespace-nowrap"
                    >
                        <Trans>Details</Trans> ▸
                    </button>
                </div>
            </div>
        </div>
    );
};
