import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { UpIcon } from "components/icons/teenny/up";

export const Menu = () => (
    <span>
        <UpIcon />
        <a
            href={"/firmware"}
            onClick={(e) => {
                e.preventDefault();
                route("/firmware");
            }}
        >
            <Trans>Firmware</Trans>
        </a>
    </span>
);
