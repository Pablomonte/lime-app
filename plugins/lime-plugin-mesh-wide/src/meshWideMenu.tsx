import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { MapIcon } from "components/icons/teenny/map";

export const MeshWideMenu = () => (
    <span>
        <MapIcon />
        <a href="/meshwide" onClick={(e) => { e.preventDefault(); route("/meshwide"); }}>
            <Trans>Mesh Map</Trans>
        </a>
    </span>
);
