import { callToRemoteNode } from "components/shared-state/SharedStateApi";

export interface SetEthConfigParams {
    device: string;
    role: "wan" | "lan" | "mesh" | "default";
    password: string;
    ip?: string;
}

export interface SetEthConfigResponse {
    status: string;
    message?: string;
}

export const setEthConfig = async ({
    device,
    role,
    password,
    ip,
}: SetEthConfigParams): Promise<SetEthConfigResponse> => {
    // In development mode, try to get IP from various sources
    // In production, use the actual hostname from the router
    let targetIp = ip;

    if (!targetIp) {
        const hostname = window.location.hostname;
        const isLocalDev =
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "0.0.0.0" ||
            hostname === "";

        if (isLocalDev) {
            // Development: use the host configured in .env (NODE_HOST)
            // Injected via webpack.DefinePlugin in preact.config.js
            targetIp = process.env.NODE_HOST || "cambia7c2";
        } else {
            // Production: use the actual hostname we're accessing
            targetIp = hostname;
        }
    }

    const result = await callToRemoteNode({
        ip: targetIp,
        apiCall: (customApi) =>
            customApi.call("lime-eth-config", "set_eth_config", {
                device,
                role,
            }),
        username: "root",
        password,
    });
    return result;
};
