import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { GlobeAmericasIcon } from "components/icons/teenny/globe";

export const MeshUpgradeMenu = () => (
    <span>
        <GlobeAmericasIcon />
        <a href="/meshwide/upgrade" onClick={(e) => { e.preventDefault(); route("/meshwide/upgrade"); }}>
            <Trans>Mesh Wide Upgrade</Trans>
        </a>
    </span>
);
