import { Trans } from "@lingui/macro";

import Loading from "components/loading";

import { useLeafletAvailability } from "plugins/lime-plugin-mesh-wide/src/hooks/useLeafletAvailability";
import { useViewMode } from "plugins/lime-plugin-mesh-wide/src/hooks/useViewMode";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { MapView } from "plugins/lime-plugin-mesh-wide/src/views/MapView";
import { OfflineView } from "plugins/lime-plugin-mesh-wide/src/views/OfflineView";
import { ViewSelector } from "plugins/lime-plugin-mesh-wide/src/views/ViewSelector";
import {
    BabelLinksProvider,
    BatmanLinksProvider,
    MeshWideLinksProvider,
} from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { NodesProvider } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";

/**
 * Main mesh-wide component with view orchestration
 *
 * Manages switching between map and offline views based on:
 * - Leaflet availability
 * - User preference
 * - Presence of non-located nodes
 */
const MeshWide = () => {
    const { isAvailable: leafletAvailable, isLoading } =
        useLeafletAvailability();
    const { hasNonLocatedNodes } = useNodes();

    const {
        current,
        preference,
        switchToView,
        resetToAuto,
        isViewAvailable,
    } = useViewMode(leafletAvailable, hasNonLocatedNodes);

    // Show loading while detecting Leaflet availability
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading />
                <div className="ml-4">
                    <Trans>Loading mesh-wide...</Trans>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {/* View selector tabs */}
            <ViewSelector
                current={current}
                preference={preference}
                onSelectView={switchToView}
                onSelectAuto={resetToAuto}
                isMapAvailable={leafletAvailable}
            />

            {/* Render current view */}
            {current === "map" ? <MapView /> : <OfflineView />}
        </div>
    );
};

/**
 * Mesh-wide page with all providers
 */
const MeshWidePage = () => {
    return (
        <NodesProvider>
            <BatmanLinksProvider>
                <BabelLinksProvider>
                    <MeshWideLinksProvider>
                        <MeshWide />
                    </MeshWideLinksProvider>
                </BabelLinksProvider>
            </BatmanLinksProvider>
        </NodesProvider>
    );
};

export default MeshWidePage;
