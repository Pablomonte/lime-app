import { useLoadLeaflet } from "plugins/lime-plugin-locate/src/locateQueries";

/**
 * Hook to detect if Leaflet is available and loaded successfully
 *
 * This hook wraps useLoadLeaflet to provide a simple boolean availability check
 * and loading state for conditional rendering of map vs offline views.
 *
 * @returns Object containing:
 *   - isAvailable: true if Leaflet loaded successfully
 *   - isLoading: true while Leaflet is loading
 *   - error: error object if loading failed
 */
export const useLeafletAvailability = () => {
    const {
        isError,
        isFetchedAfterMount: assetsLoaded,
        isLoading,
        error,
    } = useLoadLeaflet({
        refetchOnWindowFocus: false,
        // Don't retry indefinitely if Leaflet fails to load
        retry: 1,
    });

    return {
        isAvailable: assetsLoaded && !isError,
        isLoading,
        error: isError ? error : null,
    };
};
