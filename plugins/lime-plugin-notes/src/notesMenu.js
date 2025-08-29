import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { DocIcon } from "components/icons/teenny/doc";

export const Menu = () => (
    <span>
        <DocIcon />
        <a
            href="/notes"
            onClick={(e) => {
                e.preventDefault();
                route("/notes");
            }}
        >
            <Trans>Notes</Trans>
        </a>
    </span>
);
