import { Trans } from "@lingui/macro";
import { route } from "preact-router";

export const Menu = () => (
    <a
        href={"/groundrouting"}
        onClick={(e) => {
            e.preventDefault();
            route("/groundrouting");
        }}
    >
        <Trans>Ground Routing</Trans>
    </a>
);
