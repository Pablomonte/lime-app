import api from "../../../src/utils/uhttpd.service";

// Modern API functions for ground routing
export const fetchGroundRouting = async () => {
    try {
        const response = await api.call("lime-groundrouting", "get", {});
        if (typeof response.config === "undefined") {
            throw new Error("Ground routing config not found");
        }
        return response;
    } catch (error) {
        throw new Error(`Failed to fetch ground routing: ${error.message}`);
    }
};

export const saveGroundRouting = async (config) => {
    try {
        const response = await api.call("lime-groundrouting", "set", config);
        return response;
    } catch (error) {
        throw new Error(`Failed to save ground routing: ${error.message}`);
    }
};
