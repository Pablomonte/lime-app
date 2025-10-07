import { Trans } from "@lingui/macro";
import { route } from "preact-router";

import Loading from "components/loading";

import { useUpgradeConfirm, useUpgradeRevert } from "../firmwareQueries";

export const ConfirmChoices = ({ onConfirm, onRevert, submitting, error }) => (
    <div className={`container container-padded container-center`}>
        <button onClick={onConfirm}>
            <Trans>Confirm</Trans>
        </button>
        <p>
            <Trans>to keep the current configuration. Or ...</Trans>
        </p>
        <button onClick={onRevert}>
            <Trans>Revert</Trans>
        </button>
        <p>
            <Trans>to the previous configuration</Trans>
        </p>
        {error && (
            <div style={{ color: "red", marginTop: "1rem" }}>
                <Trans>Error confirming upgrade: {error.message}</Trans>
            </div>
        )}
        {submitting && (
            <div>
                <Loading />
            </div>
        )}
    </div>
);

export const Reverted = () => (
    <div className={`container container-padded container-center`}>
        <h3>
            <Trans>Reverting to previous version</Trans>
        </h3>
        <span>
            <Trans>
                Please wait while the device reboots, and reload the app
            </Trans>
        </span>
    </div>
);

export const ConfirmPage = ({ hasReverted, onReverted }) => {
    const {
        mutateAsync: upgradeConfirm,
        isLoading: isConfirming,
        error: confirmError,
    } = useUpgradeConfirm();
    const { mutate: upgradeRevert, isLoading: isReverting } =
        useUpgradeRevert();

    async function onConfirm() {
        try {
            await upgradeConfirm();
            route("/");
        } catch (error) {
            console.error("Confirmation failed:", error);
            // The error handler in the mutation will handle UI updates
        }
    }

    async function onRevert() {
        await upgradeRevert();
        onReverted();
    }

    if (hasReverted) {
        return <Reverted />;
    }

    return (
        <ConfirmChoices
            onConfirm={onConfirm}
            onRevert={onRevert}
            submitting={isConfirming || isReverting}
            error={confirmError}
        />
    );
};
