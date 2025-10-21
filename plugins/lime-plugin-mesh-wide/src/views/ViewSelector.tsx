import { Trans } from "@lingui/macro";

import {
    CurrentView,
    ViewMode,
} from "plugins/lime-plugin-mesh-wide/src/lib/viewModeDetector";

interface ViewSelectorProps {
    current: CurrentView;
    preference: ViewMode;
    onSelectView: (view: CurrentView) => void;
    onSelectAuto: () => void;
    isMapAvailable: boolean;
}

/**
 * View selector component for switching between map and offline views
 *
 * Shows tabs for:
 * - Map view (disabled if Leaflet not available)
 * - Offline view (always available)
 * - Auto mode (automatic selection)
 */
export const ViewSelector = ({
    current,
    preference,
    onSelectView,
    onSelectAuto,
    isMapAvailable,
}: ViewSelectorProps) => {
    const buttonBaseClass =
        "px-6 py-3 font-semibold rounded-t-lg transition-all border-b-2";
    const activeClass =
        "bg-white border-primary text-primary border-b-4";
    const inactiveClass =
        "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200";
    const disabledClass =
        "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed";

    return (
        <div className="bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
            <div className="flex gap-1 px-4 pt-2">
                {/* Map view button */}
                <button
                    onClick={() => isMapAvailable && onSelectView("map")}
                    disabled={!isMapAvailable}
                    className={`${buttonBaseClass} ${
                        preference === "map"
                            ? activeClass
                            : isMapAvailable
                            ? inactiveClass
                            : disabledClass
                    }`}
                    title={
                        isMapAvailable
                            ? "Show map view with geographic visualization"
                            : "Map view unavailable - Leaflet could not be loaded"
                    }
                >
                    <span className="flex items-center gap-2">
                        <span className="text-xl">🗺️</span>
                        <span>
                            <Trans>Map</Trans>
                        </span>
                        {!isMapAvailable && (
                            <span className="text-xs">(offline)</span>
                        )}
                    </span>
                </button>

                {/* Offline view button */}
                <button
                    onClick={() => onSelectView("offline")}
                    className={`${buttonBaseClass} ${
                        preference === "offline" ? activeClass : inactiveClass
                    }`}
                    title="Show offline view with lists and cards"
                >
                    <span className="flex items-center gap-2">
                        <span className="text-xl">📋</span>
                        <span>
                            <Trans>Offline</Trans>
                        </span>
                    </span>
                </button>

                {/* Auto mode button */}
                <button
                    onClick={onSelectAuto}
                    className={`${buttonBaseClass} ${
                        preference === "auto" ? activeClass : inactiveClass
                    }`}
                    title="Automatically choose best view based on availability"
                >
                    <span className="flex items-center gap-2">
                        <span className="text-xl">🔄</span>
                        <span>
                            <Trans>Auto</Trans>
                        </span>
                    </span>
                </button>
            </div>

            {/* Current view indicator */}
            <div className="bg-white px-4 py-2 text-sm text-gray-600 border-t border-gray-200">
                <Trans>Currently showing:</Trans>{" "}
                <span className="font-semibold">
                    {current === "map" ? (
                        <Trans>Map View</Trans>
                    ) : (
                        <Trans>Offline View</Trans>
                    )}
                </span>
                {preference === "auto" && (
                    <span className="ml-2 text-xs text-gray-500">
                        (<Trans>auto-selected</Trans>)
                    </span>
                )}
            </div>
        </div>
    );
};
