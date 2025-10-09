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
        // Backend expects { text: "..." } not { notes: "..." }
        const response = await api.call("lime-utils", "set_notes", {
            text: notes,
        });
        return response;
    } catch (error) {
        const errorMsg =
            error?.message || error?.toString() || JSON.stringify(error);
        console.error("Error saving notes:", error);
        throw new Error(`Failed to save notes: ${errorMsg}`);
    }
};
