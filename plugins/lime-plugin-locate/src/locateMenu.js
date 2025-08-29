import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { PinIcon } from "components/icons/teenny/pin";

export const LocateMenu = () => (
    <span>
        <PinIcon />
        <a
            href={"/locate"}
            onClick={(e) => {
                e.preventDefault();
                route("/locate");
            }}
        >
            <Trans>Locate</Trans>
        </a>
    </span>
);
