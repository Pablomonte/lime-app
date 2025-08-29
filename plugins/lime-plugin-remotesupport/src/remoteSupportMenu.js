import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { LifeBuoyIcon } from "components/icons/teenny/lifebuoy";

const Menu = () => (
    <span>
        <LifeBuoyIcon />
        <a
            href={"/remotesupport"}
            onClick={(e) => {
                e.preventDefault();
                route("/remotesupport");
            }}
        >
            <Trans>Remote Support</Trans>
        </a>
    </span>
);

export default Menu;
