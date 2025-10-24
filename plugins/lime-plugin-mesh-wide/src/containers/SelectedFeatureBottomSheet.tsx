import { useEffect, useMemo, useState } from "preact/hooks";

import { BottomSheet } from "components/bottom-sheet";

import {
    FeatureDetail,
    FeatureReferenceStatus,
} from "plugins/lime-plugin-mesh-wide/src/components/FeatureDetail";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";

/**
 * Calculate responsive initial drawer position based on screen size
 * Returns distance from top that ensures good visibility and easy grabbing
 */
const getResponsiveDrawerPosition = () => {
    const windowHeight = window.innerHeight;

    // Mobile (portrait): show 60% of content
    if (windowHeight <= 667) {
        return Math.floor(windowHeight * 0.35);
    }
    // Tablet/Mobile landscape: show 50% of content
    if (windowHeight <= 900) {
        return Math.floor(windowHeight * 0.45);
    }
    // Desktop: show about 45% of content
    return Math.floor(windowHeight * 0.30);
};

export const SelectedFeatureBottomSheet = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: selectedMapFeature } = useSelectedMapFeature();

    // Calculate responsive drawer position
    const initialDrawerPosition = useMemo(() => {
        return getResponsiveDrawerPosition();
    }, []);

    useEffect(() => {
        if (selectedMapFeature == null) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [selectedMapFeature]);

    return (
        <div>
            <BottomSheet
                closeButton={false}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                initialDrawerDistanceTop={initialDrawerPosition}
                footer={
                    <FeatureReferenceStatus
                        selectedFeature={selectedMapFeature}
                    />
                }
            >
                <div className={"px-10"}>
                    <FeatureDetail selectedFeature={selectedMapFeature} />
                </div>
            </BottomSheet>
        </div>
    );
};
