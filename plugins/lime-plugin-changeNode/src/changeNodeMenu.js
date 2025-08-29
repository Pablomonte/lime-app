import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { RouterIcon } from "components/icons/teenny/router";

export const ChangeNodeMenu = () => (
    <span>
        <RouterIcon />
        <a
            href="/changenode"
            onClick={(e) => {
                e.preventDefault();
                route("/changenode");
            }}
        >
            <Trans>Visit a neighboring node</Trans>
        </a>
    </span>
);
