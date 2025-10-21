import { Trans } from "@lingui/macro";
import { useMemo, useState } from "preact/hooks";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";

type LinkType = "wifi" | "batman" | "babel";

/**
 * Link topology section showing connections between nodes
 */
export const LinkTopology = () => {
    const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default
    const [selectedType, setSelectedType] = useState<LinkType | "all">("all");

    // TODO: Implement link data access via contexts
    // For now, using empty placeholders until we refactor link access
    const locatedLinks = {
        wifiLinks: {},
        batmanLinks: {},
        babelLinks: {},
    };

    // Aggregate link data
    // TODO: Re-implement when we have proper link context access
    const linkData = useMemo(() => {
        // Empty arrays for now - will be populated with actual link data
        const wifi: any[] = [];
        const batman: any[] = [];
        const babel: any[] = [];

        return { wifi, batman, babel };
    }, []);

    // Filter by selected type
    const filteredLinks = useMemo(() => {
        if (selectedType === "all") {
            return [
                ...linkData.wifi,
                ...linkData.batman,
                ...linkData.babel,
            ];
        }
        return linkData[selectedType];
    }, [linkData, selectedType]);

    const linkIcon = (
        <svg
            className={IconsClassName}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
    );

    return (
        <Section className="border border-primary-dark rounded-md mx-4 mb-6">
            <div
                className="cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <SectionTitle icon={linkIcon}>
                    <div className="flex items-center justify-between w-full pr-6">
                        <span>
                            <Trans>
                                Link Topology ({filteredLinks.length} links)
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
                    {/* Link type filter */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        <button
                            onClick={() => setSelectedType("all")}
                            className={`px-4 py-2 rounded ${
                                selectedType === "all"
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            <Trans>
                                All ({linkData.wifi.length + linkData.batman.length + linkData.babel.length})
                            </Trans>
                        </button>
                        <button
                            onClick={() => setSelectedType("wifi")}
                            className={`px-4 py-2 rounded ${
                                selectedType === "wifi"
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            <Trans>WiFi ({linkData.wifi.length})</Trans>
                        </button>
                        <button
                            onClick={() => setSelectedType("batman")}
                            className={`px-4 py-2 rounded ${
                                selectedType === "batman"
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            <Trans>Batman ({linkData.batman.length})</Trans>
                        </button>
                        <button
                            onClick={() => setSelectedType("babel")}
                            className={`px-4 py-2 rounded ${
                                selectedType === "babel"
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            <Trans>Babel ({linkData.babel.length})</Trans>
                        </button>
                    </div>

                    {/* Links list */}
                    {filteredLinks.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Trans>No links found</Trans>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {filteredLinks.map((link, idx) => (
                                <div
                                    key={idx}
                                    className="border border-gray-300 rounded p-3 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        {/* Link type badge */}
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-bold ${
                                                link.type === "wifi"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : link.type === "batman"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {link.type.toUpperCase()}
                                        </span>

                                        {/* Link visualization */}
                                        <div className="flex items-center gap-2 flex-1">
                                            <span className="font-semibold truncate">
                                                {link.srcNode}
                                            </span>
                                            <span
                                                className={`${
                                                    link.quality === "healthy"
                                                        ? "text-green-600"
                                                        : link.quality ===
                                                          "degraded"
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {link.quality === "healthy"
                                                    ? "━━━━"
                                                    : link.quality ===
                                                      "degraded"
                                                    ? "┄┄┄┄"
                                                    : "╌╌╌╌"}
                                            </span>
                                            <span className="font-semibold truncate">
                                                {link.dstNode}
                                            </span>
                                        </div>

                                        {/* Link details */}
                                        <div className="text-sm text-gray-600">
                                            {"signal" in link && (
                                                <span>{link.signal} dBm</span>
                                            )}
                                            {"iface" in link && (
                                                <span>{link.iface}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Section>
    );
};
