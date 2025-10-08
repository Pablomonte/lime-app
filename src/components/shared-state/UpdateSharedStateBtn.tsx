import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { useEffect } from "preact/hooks";

import { Button } from "components/buttons/button";
import { RefreshIcon } from "components/icons/teenny/refresh";
import useSharedStateSync, {
    ISyncWithNodeProps,
} from "components/shared-state/useSharedStateSync";

const UpdateSharedStateBtn = ({
    updateOnMount = true,
    ...rest
}: {
    updateOnMount?: boolean;
} & ISyncWithNodeProps) => {
    const { syncNode, isLoading } = useSharedStateSync({ ...rest });
    const [showTooltip, setShowTooltip] = useState(false);

    // Use effect to sync the node data on mount
    useEffect(() => {
        if (!updateOnMount) return;
        (async () => {
            await syncNode();
        })();
        // Avoid executing the effect on updateOnMount change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rest]);

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Button
                color={"primary"}
                outline
                disabled={isLoading}
                size={"sm"}
                onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await syncNode();
                }}
            >
                <RefreshIcon />
            </Button>
            {showTooltip && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "8px",
                        padding: "8px 12px",
                        backgroundColor: "#333",
                        color: "white",
                        fontSize: "12px",
                        borderRadius: "6px",
                        maxWidth: "200px",
                        whiteSpace: "normal",
                        textAlign: "center",
                        zIndex: 1000,
                        pointerEvents: "none",
                    }}
                >
                    <Trans>Publish local state to this node and sync its state back</Trans>
                    <div
                        style={{
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "6px solid transparent",
                            borderRight: "6px solid transparent",
                            borderBottom: "6px solid #333",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateSharedStateBtn;
