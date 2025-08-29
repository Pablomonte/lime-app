import api from "../../../src/utils/uhttpd.service";

// Modern API functions for notes
export const fetchNotes = async () => {
    try {
        const response = await api.call("lime-utils", "get_notes", {});
        if (typeof response.notes === "undefined") {
            throw new Error("Notes not found in response");
        }
        return response;
    } catch (error) {
        throw new Error(`Failed to fetch notes: ${error.message}`);
    }
};

export const saveNotes = async (notes) => {
    try {
        const response = await api.call("lime-utils", "set_notes", { notes });
        return response;
    } catch (error) {
        throw new Error(`Failed to save notes: ${error.message}`);
    }
};
