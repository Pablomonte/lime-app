import { useMemo } from "preact/hooks";

import { useLocatedLinks } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocatedLinks";
import { LocatedLinkData } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

/**
 * Aggregated links data from all three link types
 */
export interface AllLinksData {
    wifi: LocatedLinkData;
    batman: LocatedLinkData;
    babel: LocatedLinkData;
    allLoaded: boolean;
    isLoading: boolean;
}

/**
 * Hook to access all link types (WiFi, Batman, Babel) in one call
 *
 * This aggregates data from the three link contexts to make it easier
 * to work with all links at once in components that need unified access.
 *
 * @returns Aggregated links data and loading states
 */
export const useAllLinks = (): AllLinksData => {
    // Access all three link contexts
    const wifiLinks = useLocatedLinks({ type: "wifi_links_info" });
    const batmanLinks = useLocatedLinks({ type: "bat_links_info" });
    const babelLinks = useLocatedLinks({ type: "babel_links_info" });

    // Aggregate loading states
    const allLoaded =
        wifiLinks.linksLoaded &&
        batmanLinks.linksLoaded &&
        babelLinks.linksLoaded;

    const isLoading = !allLoaded;

    // Memoize the aggregated data
    const aggregatedData = useMemo(
        () => ({
            wifi: wifiLinks.locatedLinks || {},
            batman: batmanLinks.locatedLinks || {},
            babel: babelLinks.locatedLinks || {},
            allLoaded,
            isLoading,
        }),
        [
            wifiLinks.locatedLinks,
            batmanLinks.locatedLinks,
            babelLinks.locatedLinks,
            allLoaded,
            isLoading,
        ]
    );

    return aggregatedData;
};
