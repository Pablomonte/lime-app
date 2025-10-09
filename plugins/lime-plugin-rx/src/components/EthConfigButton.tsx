import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { route } from "preact-router";

import { Modal, ModalProps } from "components/Modal/Modal";
import { useDisclosure } from "components/Modal/useDisclosure";
import { Button } from "components/buttons/button";

import { GearIcon } from "plugins/lime-plugin-rx/src/icons/gearIcon";
import { EthRole } from "plugins/lime-plugin-rx/src/rxTypes";

interface EthConfigModalProps extends Pick<ModalProps, "isOpen" | "onClose"> {
    device: string;
    currentRole: string;
}

const EthConfigModal = ({
    device,
    currentRole,
    isOpen,
    onClose,
}: EthConfigModalProps) => {
    const [selectedRole, setSelectedRole] = useState<EthRole>(
        currentRole.toLowerCase() as EthRole
    );

    const roles: { value: EthRole; label: string; description: string }[] = [
        {
            value: "wan",
            label: "WAN",
            description: "Internet connection",
        },
        {
            value: "lan",
            label: "LAN",
            description: "Client connection",
        },
        {
            value: "mesh",
            label: "MESH",
            description: "Connecting nodes",
        },
        {
            value: "default",
            label: "Default",
            description: "Remove custom configuration",
        },
    ];

    const handleSubmit = () => {
        // Close modal and redirect to progress page
        // Password will be requested in the progress page
        onClose();
        route(
            `/rx/configuring?device=${encodeURIComponent(device)}&role=${encodeURIComponent(selectedRole)}`
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={handleSubmit}
            title={<Trans>Configure port {device}</Trans>}
            successBtnText={<Trans>Apply</Trans>}
            cancelBtn={true}
        >
            <div>
                <div className={"mb-4"}>
                    <Trans>
                        Select the role for this ethernet port.
                    </Trans>
                </div>
                <div className={"mt-4"}>
                    {roles.map((role) => (
                        <label
                            key={role.value}
                            className={
                                "flex items-center gap-3 p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100"
                            }
                        >
                            <input
                                type="radio"
                                name="role"
                                value={role.value}
                                checked={selectedRole === role.value}
                                onChange={(e) =>
                                    setSelectedRole(
                                        (e.target as HTMLInputElement)
                                            .value as EthRole
                                    )
                                }
                                className={"w-4 h-4"}
                            />
                            <div>
                                <div className={"font-bold"}>
                                    {role.label}
                                </div>
                                <div className={"text-sm text-gray-600"}>
                                    {role.description}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export const EthConfigButton = ({
    device,
    currentRole,
}: {
    device: string;
    currentRole: string;
}) => {
    const { open, onOpen, onClose } = useDisclosure();
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <>
            <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <Button
                    color={"primary"}
                    outline={true}
                    size={"sm"}
                    onClick={() => onOpen()}
                >
                    <GearIcon className={"h-4 w-4"} />
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
                            maxWidth: "140px",
                            whiteSpace: "normal",
                            textAlign: "center",
                            zIndex: 1000,
                            pointerEvents: "none",
                        }}
                    >
                        <Trans>Configure port</Trans>
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
            <EthConfigModal
                device={device}
                currentRole={currentRole}
                isOpen={open}
                onClose={onClose}
            />
        </>
    );
};
