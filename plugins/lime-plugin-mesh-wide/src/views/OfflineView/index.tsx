import { Trans } from "@lingui/macro";

import { NetworkSummary } from "plugins/lime-plugin-mesh-wide/src/views/OfflineView/NetworkSummary";
import { HealthStatus } from "plugins/lime-plugin-mesh-wide/src/views/OfflineView/HealthStatus";
import { NodesList } from "plugins/lime-plugin-mesh-wide/src/views/OfflineView/NodesList";
import { LinkTopology } from "plugins/lime-plugin-mesh-wide/src/views/OfflineView/LinkTopology";
import { SelectedFeatureBottomSheet } from "plugins/lime-plugin-mesh-wide/src/containers/SelectedFeatureBottomSheet";

/**
 * Offline view for mesh-wide - Works without map/internet
 *
 * This view provides full mesh network visualization and management
 * capabilities without requiring Leaflet or geographic coordinates.
 *
 * Features:
 * - Network health overview
 * - Node list with search and filters
 * - Link topology visualization
 * - All node actions (reboot, sync, details)
 * - Error detection and reporting
 */
export const OfflineView = () => {
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header info */}
            <div className="bg-blue-100 border-b border-blue-300 px-4 py-3 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    <div>
                        <div className="font-semibold text-blue-900">
                            <Trans>Offline Mode</Trans>
                        </div>
                        <div className="text-sm text-blue-700">
                            <Trans>
                                Viewing network without map. Switch to map view when online.
                            </Trans>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col gap-6 pb-8">
                {/* Network summary cards */}
                <NetworkSummary />

                {/* Health status with errors */}
                <HealthStatus />

                {/* Nodes list */}
                <NodesList />

                {/* Link topology */}
                <LinkTopology />
            </div>

            {/* Bottom sheet for details (reused from map view) */}
            <SelectedFeatureBottomSheet />
        </div>
    );
};
