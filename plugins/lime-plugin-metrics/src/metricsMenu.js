import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { EqualizerIcon } from "components/icons/teenny/equalizer";

export const MetricsMenu = () => (
    <span>
        <EqualizerIcon />
        <a
            href={"/metrics"}
            onClick={(e) => {
                e.preventDefault();
                route("/metrics");
            }}
        >
            <Trans>Metrics</Trans>
        </a>
    </span>
);
