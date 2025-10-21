/**
 * View mode types for mesh-wide visualization
 */
export type ViewMode = "map" | "offline" | "auto";
export type CurrentView = "map" | "offline";

/**
 * State for view mode detection
 */
export interface ViewModeState {
    /** Currently rendered view */
    current: CurrentView;
    /** User's preference (can be auto) */
    preference: ViewMode;
    /** Whether Leaflet is available */
    leafletAvailable: boolean;
    /** Whether there are nodes without coordinates */
    hasNonLocatedNodes: boolean;
}

/**
 * localStorage key for persisting user preference
 */
export const VIEW_MODE_STORAGE_KEY = "meshwide_view_mode_preference";

/**
 * Determines which view should be shown based on current state
 *
 * Logic:
 * - AUTO mode: Show map if Leaflet available and all nodes located, otherwise offline
 * - MAP mode: Show map if Leaflet available, otherwise offline (fallback)
 * - OFFLINE mode: Always show offline
 *
 * @param preference - User's view mode preference
 * @param leafletAvailable - Whether Leaflet loaded successfully
 * @param hasNonLocatedNodes - Whether there are nodes without coordinates
 * @returns The view that should be rendered
 */
export const determineCurrentView = (
    preference: ViewMode,
    leafletAvailable: boolean,
    hasNonLocatedNodes: boolean
): CurrentView => {
    switch (preference) {
        case "auto":
            // Auto mode: prefer map if available and all nodes are located
            return leafletAvailable && !hasNonLocatedNodes ? "map" : "offline";

        case "map":
            // Manual map mode: show map if available, otherwise fallback to offline
            return leafletAvailable ? "map" : "offline";

        case "offline":
            // Manual offline mode: always show offline
            return "offline";

        default:
            // Fallback to offline for unknown preferences
            return "offline";
    }
};

/**
 * Loads user's view mode preference from localStorage
 *
 * @returns The stored preference, or 'auto' as default
 */
export const loadViewModePreference = (): ViewMode => {
    try {
        const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
        if (stored === "map" || stored === "offline" || stored === "auto") {
            return stored;
        }
    } catch (error) {
        console.warn("Failed to load view mode preference:", error);
    }
    return "auto"; // Default to auto mode
};

/**
 * Saves user's view mode preference to localStorage
 *
 * @param preference - The preference to save
 */
export const saveViewModePreference = (preference: ViewMode): void => {
    try {
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, preference);
    } catch (error) {
        console.error("Failed to save view mode preference:", error);
    }
};

/**
 * Checks if a view transition should show a warning to the user
 *
 * @param from - Current view
 * @param to - Target view
 * @param leafletAvailable - Whether Leaflet is available
 * @returns Warning message or null if no warning needed
 */
export const getViewTransitionWarning = (
    from: CurrentView,
    to: CurrentView,
    leafletAvailable: boolean
): string | null => {
    // Warn when trying to switch to map but Leaflet is not available
    if (to === "map" && !leafletAvailable) {
        return "Map view is not available. Leaflet could not be loaded. Showing offline view instead.";
    }

    // No warning needed
    return null;
};
