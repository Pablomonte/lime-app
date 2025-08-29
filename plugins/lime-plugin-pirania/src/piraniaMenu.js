import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import { TicketIcon } from "components/icons/teenny/ticket";

const PiraniaMenu = () => (
    <span>
        <TicketIcon />
        <a
            href={"/access"}
            onClick={(e) => {
                e.preventDefault();
                route("/access");
            }}
        >
            <Trans>Access Vouchers</Trans>
        </a>
    </span>
);

export default PiraniaMenu;
