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
            // Development: use the IP configured in .env (NODE_HOST)
            // Update this to match your router's IP
            targetIp = "10.214.39.194";
        } else {
            // Production: use the actual hostname we're accessing
            targetIp = hostname;
        }
    }

    console.log("setEthConfig - Target IP:", targetIp);
    console.log(
        "setEthConfig - Username: root, Password:",
        password ? "***" : "empty"
    );

    try {
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
        console.log("setEthConfig - Success:", result);
        return result;
    } catch (error) {
        console.error("setEthConfig - Error:", error);
        throw error;
    }
};
