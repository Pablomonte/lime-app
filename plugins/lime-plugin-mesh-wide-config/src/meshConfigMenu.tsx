import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { AdjustVertical } from "components/icons/teenny/adjust";

export const MeshConfigMenu = () => (
    <span>
        <AdjustVertical />
        <a href="/meshwide/config" onClick={(e) => { e.preventDefault(); route("/meshwide/config"); }}>
            <Trans>Mesh Wide Config</Trans>
        </a>
    </span>
);
