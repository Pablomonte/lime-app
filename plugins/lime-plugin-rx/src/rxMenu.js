import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { StatusIcon } from "components/icons/teenny/status";

export const RxMenu = () => (
    <span>
        <StatusIcon />
        <a
            href="/rx"
            onClick={(e) => {
                e.preventDefault();
                route("/rx");
            }}
        >
            <Trans>Status</Trans>
        </a>
    </span>
);
