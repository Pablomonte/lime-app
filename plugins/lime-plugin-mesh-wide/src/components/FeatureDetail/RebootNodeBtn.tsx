import { Trans } from "@lingui/macro";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "preact/hooks";

import { Modal, ModalProps } from "components/Modal/Modal";
import { useDisclosure } from "components/Modal/useDisclosure";
import { Button } from "components/buttons/button";
import { ErrorMsg } from "components/form";
import Loading from "components/loading";
import { callToRemoteNode } from "components/shared-state/SharedStateApi";
import { useErrrorConnectionToast } from "components/toast/toasts";

import { PowerIcon } from "plugins/lime-plugin-mesh-wide/src/icons/power";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

interface IRemoteRebotProps {
    ip: string;
    password: string;
}

export async function remoteReboot({ ip, password }: IRemoteRebotProps) {
    return await callToRemoteNode({
        ip,
        apiCall: (customApi) =>
            customApi.call("system", "reboot", {}).then(() => true),
        username: "root",
        password,
    });
}

const useRemoteReboot = (opts?) => {
    const { show } = useErrrorConnectionToast();
    return useMutation((props: IRemoteRebotProps) => remoteReboot(props), {
        mutationKey: ["system", "reboot"],
        onError: (error, variables) => {
            show(variables.ip);
        },
        ...opts,
    });
};

const RebootNodeModal = ({
    node,
    isOpen,
    onClose,
}: { node: INodeInfo } & Pick<ModalProps, "isOpen" | "onClose">) => {
    const [password, setPassword] = useState("");
    const { mutate, isLoading, error } = useRemoteReboot({
        onSuccess: () => {
            onClose();
        },
    });

    function changePassword(e) {
        setPassword(e.target.value || "");
    }

    const doLogin = useCallback(() => {
        mutate({ ip: node.ipv4, password });
    }, [mutate, node.ipv4, password]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={doLogin}
            title={<Trans>Reboot node {node.hostname}</Trans>}
            successBtnText={<Trans>Reboot</Trans>}
        >
            <div>
                <Trans>
                    Are you sure you want to reboot this node? This action will
                    disconnect the node from the network for a few minutes.{" "}
                    <br />
                    Add shared password or let it empty if no password is set.
                </Trans>
                {isLoading && <Loading />}
                {!isLoading && (
                    <div className={"mt-4"}>
                        <label htmlFor={"password"}>Node password</label>
                        <input
                            type="password"
                            id={"password"}
                            value={password}
                            onInput={changePassword}
                        />
                        {error && (
                            <ErrorMsg>
                                <Trans>Error performing reboot: {error}</Trans>
                            </ErrorMsg>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

const RemoteRebootBtn = ({ node }: { node: INodeInfo }) => {
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
                    color={"danger"}
                    outline={true}
                    size={"sm"}
                    onClick={() => onOpen()}
                >
                    <PowerIcon />
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
                            maxWidth: "120px",
                            whiteSpace: "normal",
                            textAlign: "center",
                            zIndex: 1000,
                            pointerEvents: "none",
                        }}
                    >
                        <Trans>Reboot node</Trans>
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
            <RebootNodeModal node={node} isOpen={open} onClose={onClose} />
        </>
    );
};

export default RemoteRebootBtn;
