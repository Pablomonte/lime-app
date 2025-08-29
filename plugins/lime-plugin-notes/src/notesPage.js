/* eslint @typescript-eslint/no-empty-function: "off" */
import { Trans } from "@lingui/macro";
import { useEffect, useState } from "preact/hooks";

import { useOptimizedMutation, useOptimizedQuery } from "utils/optimizedQuery";
import { useBoardData } from "utils/queries";
import { queryKeys } from "utils/queryKeys";

import style from "./style.less";

export const Page = () => {
    const { data: boardData } = useBoardData();

    // Use TanStack Query for notes data
    const { data: notesData, isLoading } = useOptimizedQuery(
        queryKeys.notes,
        async () => {
            const { fetchNotes } = await import("./notesApi");
            return fetchNotes();
        }
    );

    // Use TanStack Query for saving notes
    const { mutate: saveNotesMutation } = useOptimizedMutation(
        async (notes) => {
            const { saveNotes } = await import("./notesApi");
            return saveNotes(notes);
        }
    );

    const [value, setValue] = useState(notesData?.notes || "");

    function handleChange(event) {
        setValue(event.target.value);
    }

    function saveNotes() {
        saveNotesMutation(value);
    }

    // Update local state when notes are loaded
    useEffect(() => {
        if (notesData?.notes) {
            setValue(notesData.notes);
        }
    }, [notesData?.notes]);

    return (
        <div className="container container-padded">
            <h4>
                <span>
                    <Trans>Notes of</Trans>
                </span>{" "}
                {boardData?.hostname}
            </h4>
            <textarea
                onChange={handleChange}
                className={style.notes}
                value={value}
            />
            <button disabled={isLoading} onClick={saveNotes}>
                <Trans>Save notes</Trans>
            </button>
        </div>
    );
};

// No more Redux needed!
export default Page;
