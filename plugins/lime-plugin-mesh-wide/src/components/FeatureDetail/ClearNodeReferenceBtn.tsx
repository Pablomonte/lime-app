import { Trans } from "@lingui/macro";
import { useState } from "react";

import { Modal } from "components/Modal/Modal";
import useSharedStateSync from "components/shared-state/useSharedStateSync";
import { useToast } from "components/toast/toastProvider";

import { TrashIcon } from "plugins/lime-plugin-mesh-wide/src/icons/trash";
import { useSetNodeInfoReferenceState } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { getMeshWideMapTypes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

interface ClearNodeReferenceBtnProps {
    hostname: string;
    ip: string;
}

const ClearNodeReferenceBtn = ({ hostname, ip }: ClearNodeReferenceBtnProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const { showToast } = useToast();

    const { syncNode } = useSharedStateSync({
        ip,
        nodeName: hostname,
        types: getMeshWideMapTypes(),
    });

    const { mutateAsync, isLoading } = useSetNodeInfoReferenceState({
        ip,
        hostname,
        isDown: true, // true means delete from reference
        params: {
            onSuccess: async () => {
                try {
                    await syncNode();
                    showToast({
                        text: <Trans>Reference state cleared for this node!</Trans>,
                    });
                    setShowModal(false);
                    // Reload page to refresh all data
                    setTimeout(() => window.location.reload(), 1000);
                } catch (error) {
                    console.error("Error syncing after clear:", error);
                    showToast({
                        text: <Trans>Cleared but sync failed. Refresh the page.</Trans>,
                    });
                }
            },
            onError: (error) => {
                console.error("Error clearing reference state:", error);
                showToast({
                    text: <Trans>Error clearing reference state!</Trans>,
                });
            },
        },
    });

    return (
        <>
            <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer font-semibold rounded-xl text-center place-content-center transition-all duration-300 justify-center border-0 py-2 px-4 text-sm border-2 border-danger text-danger hover:bg-danger hover:text-white"
                >
                    <TrashIcon />
                </div>
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
                            maxWidth: "160px",
                            whiteSpace: "normal",
                            textAlign: "center",
                            zIndex: 1000,
                            pointerEvents: "none",
                        }}
                    >
                        <Trans>Clear reference state</Trans>
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
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={() => mutateAsync()}
                title={<Trans>Clear reference state for {hostname}?</Trans>}
                successBtnText={<Trans>Clear</Trans>}
            >
                <Trans>
                    This will remove the reference state for this node.
                    You can set a new reference state later.
                </Trans>
            </Modal>
        </>
    );
};

export default ClearNodeReferenceBtn;
