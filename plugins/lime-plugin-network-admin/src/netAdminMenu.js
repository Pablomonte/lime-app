import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { LockIcon } from "components/icons/teenny/lock";

export const NetAdminMenu = () => (
    <span>
        <LockIcon />
        <a
            href="/netadmin"
            onClick={(e) => {
                e.preventDefault();
                route("/netadmin");
            }}
        >
            <Trans>Shared Password</Trans>
        </a>
    </span>
);
