import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";

import Loading from "components/loading";
import ProgressBar from "components/progressbar";
import { ErrorMsg } from "components/form";
import { Button } from "components/buttons/button";

import { useSetEthConfig } from "plugins/lime-plugin-rx/src/rxQueries";

interface EthConfigSuccessProps {
    device: string;
    role: string;
    onReconnect: () => void;
}

const EthConfigSuccess = ({
    device,
    role,
    onReconnect,
}: EthConfigSuccessProps) => (
    <div className="container container-padded container-center">
        <h3>
            <Trans>Network reconfiguration completed</Trans>
        </h3>
        <p>
            <Trans>
                Port {device} has been configured as {role.toUpperCase()}.
            </Trans>
        </p>
        <p>
            <b>
                <Trans>
                    You need to reconnect to the WiFi network to access the
                    node again.
                </Trans>
            </b>
        </p>
        <button onClick={onReconnect}>
            <Trans>Try reconnecting</Trans>
        </button>
    </div>
);

interface EthConfigProgressProps {
    device: string;
    role: string;
    elapsedTime: number;
    totalTime: number;
}

const EthConfigProgress = ({
    device,
    role,
    elapsedTime,
    totalTime,
}: EthConfigProgressProps) => {
    const remainingTime = totalTime - elapsedTime;
    const progress = (elapsedTime / totalTime) * 100;
    return (
        <div className="container container-padded container-center">
            <h3>
                <Trans>Reconfiguring network...</Trans>
            </h3>
            <ProgressBar progress={progress} />
            <p>
                <Trans>
                    Configuring port {device} as {role.toUpperCase()}
                </Trans>
            </p>
            <span>
                <Trans>
                    Please wait {remainingTime} seconds. The network will
                    restart and you will need to reconnect to WiFi.
                </Trans>
            </span>
        </div>
    );
};

interface EthConfigErrorProps {
    device: string;
    role: string;
    error: string;
    onRetry: () => void;
    onCancel: () => void;
}

const EthConfigError = ({
    device,
    role,
    error,
    onRetry,
    onCancel,
}: EthConfigErrorProps) => (
    <div className="container container-padded container-center">
        <h3>
            <Trans>Configuration failed</Trans>
        </h3>
        <ErrorMsg>
            <Trans>
                Failed to configure port {device} as {role.toUpperCase()}
            </Trans>
            <div style={{ marginTop: "8px", fontSize: "0.9em" }}>
                {String(error)}
            </div>
        </ErrorMsg>
        <div
            style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "20px",
            }}
        >
            <Button color="primary" onClick={onRetry}>
                <Trans>Retry</Trans>
            </Button>
            <Button color="secondary" outline={true} onClick={onCancel}>
                <Trans>Cancel</Trans>
            </Button>
        </div>
    </div>
);

const EthConfigSending = ({ device, role }: { device: string; role: string }) => (
    <div className="container container-padded container-center">
        <h3>
            <Trans>Sending configuration...</Trans>
        </h3>
        <Loading />
        <p>
            <Trans>
                Configuring port {device} as {role.toUpperCase()}
            </Trans>
        </p>
    </div>
);

interface EthConfigPasswordRequestProps {
    device: string;
    role: string;
    onSubmit: (password: string) => void;
    onCancel: () => void;
}

const EthConfigPasswordRequest = ({
    device,
    role,
    onSubmit,
    onCancel,
}: EthConfigPasswordRequestProps) => {
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (password.trim()) {
            onSubmit(password);
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === "Enter" && password.trim()) {
            handleSubmit();
        }
    };

    return (
        <div className="container container-padded container-center">
            <h3>
                <Trans>Configure port {device}</Trans>
            </h3>
            <p>
                <Trans>
                    You are about to configure port {device} as{" "}
                    {role.toUpperCase()}.
                </Trans>
            </p>
            <p>
                <Trans>The network will restart after applying changes.</Trans>
            </p>
            <div className={"mt-4"}>
                <label htmlFor={"password"}>
                    <Trans>Node password</Trans>
                </label>
                <input
                    type="password"
                    id={"password"}
                    value={password}
                    onInput={(e) =>
                        setPassword((e.target as HTMLInputElement).value || "")
                    }
                    onKeyPress={handleKeyPress}
                    autoFocus
                />
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <Button
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!password.trim()}
                >
                    <Trans>Apply</Trans>
                </Button>
                <Button color="secondary" outline={true} onClick={onCancel}>
                    <Trans>Cancel</Trans>
                </Button>
            </div>
        </div>
    );
};

interface EthConfigProgressPageProps {
    device?: string;
    role?: string;
    password?: string;
}

export const EthConfigProgressPage = ({
    device = "eth0",
    role = "mesh",
    password: initialPassword,
}: EthConfigProgressPageProps) => {
    const totalTime = 45; // 45 seconds for network restart
    const [elapsedTime, setElapsedTime] = useState(0);
    const [configState, setConfigState] = useState<
        "password_request" | "sending" | "progress" | "success" | "error"
    >("password_request");
    const [apiError, setApiError] = useState<string | null>(null);
    const [password, setPassword] = useState("");

    const { mutateAsync } = useSetEthConfig();

    // Progress timer - only runs when in progress state
    useEffect(() => {
        if (configState !== "progress") return;

        const id = setInterval(() => {
            setElapsedTime((prev) => {
                const next = prev + 1;
                if (next >= totalTime) {
                    setConfigState("success");
                }
                return next;
            });
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [configState, totalTime]);

    function onReconnect() {
        // Try to reload and go back to RX page
        route("/rx");
        window.location.reload();
    }

    function onCancel() {
        route("/rx");
    }

    const sendConfig = async (pwd: string) => {
        setConfigState("sending");
        setPassword(pwd);

        try {
            // Note: We don't await the full response because the network restart
            // may cut the SSH connection before we receive a response.
            // We just fire and forget, then start the progress timer.
            await mutateAsync({ device, role: role as any, password: pwd });

            // If we get here, the command was sent successfully
            // (though the response might not arrive due to network restart)
            setConfigState("progress");
        } catch (err) {
            // Only catch errors that happen before the network restart
            // (e.g., SSH connection refused, wrong password, etc.)
            setApiError(String(err));
            setConfigState("error");
        }
    };

    function onRetry() {
        // Go back to password request
        setConfigState("password_request");
        setApiError(null);
        setElapsedTime(0);
    }

    if (configState === "password_request") {
        return (
            <EthConfigPasswordRequest
                device={device}
                role={role}
                onSubmit={sendConfig}
                onCancel={onCancel}
            />
        );
    }

    if (configState === "sending") {
        return <EthConfigSending device={device} role={role} />;
    }

    if (configState === "error" && apiError) {
        return (
            <EthConfigError
                device={device}
                role={role}
                error={apiError}
                onRetry={onRetry}
                onCancel={onCancel}
            />
        );
    }

    if (configState === "progress") {
        return (
            <EthConfigProgress
                device={device}
                role={role}
                elapsedTime={elapsedTime}
                totalTime={totalTime}
            />
        );
    }

    if (configState === "success") {
        return (
            <EthConfigSuccess
                device={device}
                role={role}
                onReconnect={onReconnect}
            />
        );
    }

    return null;
};
