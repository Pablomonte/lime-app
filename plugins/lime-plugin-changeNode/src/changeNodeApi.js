import api from "../../../src/utils/uhttpd.service";

export const fetchCloudNodes = async () => {
    try {
        const response = await api.call("lime-utils", "get_cloud_nodes", {});
        const nodes = response.nodes;

        // Return the nodes array directly
        return nodes;
    } catch (error) {
        throw new Error(`Failed to fetch cloud nodes: ${error.message}`);
    }
};
