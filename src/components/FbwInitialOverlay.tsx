import { Trans } from "@lingui/macro";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import { useDismissFbw } from "../../plugins/lime-plugin-fbw/src/FbwQueries";
import { Banner } from "./banner";

type FbwInitialOverlayProps = {
    fbwStatus: any;
    onCancel: () => void;
};

export const FbwInitialOverlay = ({
    fbwStatus,
    onCancel,
}: FbwInitialOverlayProps) => {
    const [notShowAgain, setNotShowAgain] = useState(false);
    const { mutateAsync: dismissFbw } = useDismissFbw();

    const handleOk = () => {
        route("/firstbootwizard");
    };

    const handleCancel = () => {
        if (notShowAgain) {
            dismissFbw().then(() => onCancel());
        } else {
            onCancel();
        }
    };

    const handleNotShowAgain = (e) => {
        setNotShowAgain(e.target.checked);
    };

    const title = <Trans>Please configure your network connection</Trans>;

    const description = (
        <Trans>
            Your router has not been configured yet. You can use our assistant
            to add it to an existing network or create a new one. If you ignore
            this message, it will continue working with the default
            configuration.
        </Trans>
    );

    return (
        <Banner
            title={title}
            description={description}
            onOk={handleOk}
            onCancel={handleCancel}
            onNotShowAgain={handleNotShowAgain}
        />
    );
};
