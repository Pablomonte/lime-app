import api from "../../../src/utils/uhttpd.service";

export const fetchCloudNodes = async () => {
    try {
        const response = await api.call("lime-utils", "get_cloud_nodes", {});
        const nodes = response.nodes;

        // Transform nodes data
        const nodeList = Object.keys(nodes)
            .map((key) => nodes[key])
            .reduce((x, y) => x.concat(y), []);

        return nodeList;
    } catch (error) {
        throw new Error(`Failed to fetch cloud nodes: ${error.message}`);
    }
};
