import { Trans } from "@lingui/macro";
import { useState } from "react";

import { Modal } from "components/Modal/Modal";
import { useToast } from "components/toast/toastProvider";

import { TrashIcon } from "plugins/lime-plugin-mesh-wide/src/icons/trash";
import { PontToPointLink } from "plugins/lime-plugin-mesh-wide/src/lib/links/PointToPointLink";
import { useSetLinkReferenceState } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { LinkType } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

interface ClearLinkReferenceBtnProps {
    linkType: LinkType;
    link: PontToPointLink;
    nodesToUpdate: { [ip: string]: string };
}

const ClearLinkReferenceBtn = ({ linkType, link, nodesToUpdate }: ClearLinkReferenceBtnProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const { showToast } = useToast();

    const { callMutations, isLoading } = useSetLinkReferenceState({
        linkType,
        linkToUpdate: link,
        nodesToUpdate,
        isDown: true, // true means delete from reference
        isNewLink: false,
        params: {
            onSuccess: () => {
                showToast({
                    text: <Trans>Reference state cleared for this link!</Trans>,
                });
                setShowModal(false);
                // Reload page to refresh all data
                setTimeout(() => window.location.reload(), 1000);
            },
            onError: (error) => {
                console.error("Error clearing link reference state:", error);
                showToast({
                    text: <Trans>Error clearing reference state!</Trans>,
                });
            },
        },
    });

    const nodeNames = Object.values(nodesToUpdate).join(" - ");

    return (
        <>
            <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer font-semibold rounded-xl text-center place-content-center transition-all duration-300 justify-center py-2 px-4 text-sm border-2 border-danger text-danger hover:bg-danger hover:text-white"
                >
                    <TrashIcon />
                </div>
                {showTooltip && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginBottom: "8px",
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
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 0,
                                height: 0,
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderTop: "6px solid #333",
                            }}
                        />
                    </div>
                )}
            </div>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={() => callMutations()}
                title={<Trans>Clear reference state for this link?</Trans>}
                successBtnText={<Trans>Clear</Trans>}
            >
                <Trans>
                    This will remove the reference state for the link between {nodeNames}.
                    You can set a new reference state later.
                </Trans>
            </Modal>
        </>
    );
};

export default ClearLinkReferenceBtn;
