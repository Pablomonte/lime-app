import { useCallback, useEffect, useMemo, useState } from "preact/hooks";

import {
    CurrentView,
    ViewMode,
    ViewModeState,
    determineCurrentView,
    getViewTransitionWarning,
    loadViewModePreference,
    saveViewModePreference,
} from "plugins/lime-plugin-mesh-wide/src/lib/viewModeDetector";

/**
 * Hook to manage mesh-wide view mode (map vs offline)
 *
 * This hook handles:
 * - Loading and persisting user preference
 * - Determining which view to show based on availability
 * - Providing methods to change view mode
 * - Warning when view transitions fail
 *
 * @param leafletAvailable - Whether Leaflet is available
 * @param hasNonLocatedNodes - Whether there are nodes without coordinates
 * @returns View mode state and control methods
 */
export const useViewMode = (
    leafletAvailable: boolean,
    hasNonLocatedNodes: boolean
) => {
    // Load initial preference from localStorage
    const [preference, setPreferenceState] = useState<ViewMode>(() =>
        loadViewModePreference()
    );

    // Determine current view based on preference and availability
    const current: CurrentView = useMemo(
        () =>
            determineCurrentView(
                preference,
                leafletAvailable,
                hasNonLocatedNodes
            ),
        [preference, leafletAvailable, hasNonLocatedNodes]
    );

    // Build complete view mode state
    const viewModeState: ViewModeState = useMemo(
        () => ({
            current,
            preference,
            leafletAvailable,
            hasNonLocatedNodes,
        }),
        [current, preference, leafletAvailable, hasNonLocatedNodes]
    );

    /**
     * Sets a new view mode preference and persists it
     */
    const setPreference = useCallback((newPreference: ViewMode) => {
        setPreferenceState(newPreference);
        saveViewModePreference(newPreference);
    }, []);

    /**
     * Switches to a specific view (map or offline)
     * This updates preference to the target view or keeps auto if it matches
     */
    const switchToView = useCallback(
        (targetView: CurrentView) => {
            // If already on target view and preference is not auto, no change needed
            if (current === targetView && preference !== "auto") {
                return;
            }

            // Check if transition is possible
            const warning = getViewTransitionWarning(
                current,
                targetView,
                leafletAvailable
            );

            if (warning) {
                console.warn(warning);
                // If trying to switch to map but it's not available, stay in auto/offline
                if (targetView === "map" && !leafletAvailable) {
                    setPreference("auto");
                    return;
                }
            }

            // Set preference to the target view
            setPreference(targetView);
        },
        [current, preference, leafletAvailable, setPreference]
    );

    /**
     * Resets preference to auto mode
     */
    const resetToAuto = useCallback(() => {
        setPreference("auto");
    }, [setPreference]);

    /**
     * Checks if a specific view is currently available
     */
    const isViewAvailable = useCallback(
        (view: CurrentView): boolean => {
            if (view === "offline") {
                return true; // Offline is always available
            }
            if (view === "map") {
                return leafletAvailable; // Map only available if Leaflet loaded
            }
            return false;
        },
        [leafletAvailable]
    );

    return {
        /** Complete view mode state */
        viewModeState,
        /** Currently rendered view */
        current,
        /** User's preference */
        preference,
        /** Set a new preference */
        setPreference,
        /** Switch to a specific view */
        switchToView,
        /** Reset to auto mode */
        resetToAuto,
        /** Check if a view is available */
        isViewAvailable,
    };
};
