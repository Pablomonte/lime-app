import { Trans, t } from "@lingui/macro";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import Loading from "components/loading";

import {
    useCommunityConfig,
    useSetCommunityConfig,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";

import api from "utils/uhttpd.service";

import {
    ValidationMessages,
    isValidPassword,
} from "../../../src/containers/SharedPasswordForm";
import style from "./style.less";

export const NetAdmin = ({ submitting, success, submitSharedPassword }) => {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function changePassword(e) {
        setPassword(e.target.value || "");
    }

    function changePasswordConfirmation(e) {
        setPasswordConfirmation(e.target.value || "");
    }

    function isValidForm() {
        return isValidPassword(password) && password === passwordConfirmation;
    }

    function _submitSharedPassword() {
        submitSharedPassword(password).then(() => {
            setPassword("");
            setPasswordConfirmation("");
        });
    }

    return (
        <div className="container container-padded">
            <h4>
                <Trans>Change Shared Password</Trans>
            </h4>
            <p className="text-warning">
                <Trans>
                    This will change the password for ALL nodes in the network
                </Trans>
            </p>
            <label>
                <Trans>
                    Choose a shared password for network administration
                </Trans>
            </label>
            <input
                type="password"
                placeholder={t`Password`}
                className="u-full-width"
                value={password}
                onInput={changePassword}
            />
            <ValidationMessages password={password} />
            <label>
                <Trans>Re-enter the shared password</Trans>
            </label>
            <input
                type="password"
                placeholder={t`Re-enter Password`}
                className="u-full-width"
                value={passwordConfirmation}
                onInput={changePasswordConfirmation}
            />
            {passwordConfirmation && password !== passwordConfirmation && (
                <p>
                    <Trans>The passwords do not match!</Trans>
                </p>
            )}
            <div>
                <button
                    className="button block"
                    onClick={_submitSharedPassword}
                    disabled={!isValidForm()}
                >
                    <Trans>Change</Trans>
                </button>
            </div>
            {submitting && (
                <div className={style.loadingBox}>
                    <Loading />
                    <Trans>Setting up new password</Trans>
                </div>
            )}
            {success && (
                <div className={style.successMessage}>
                    <Trans>
                        Password updated! Redirecting to apply configuration...
                    </Trans>
                </div>
            )}
        </div>
    );
};

const NetAdminHOC = () => {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    async function submitSharedPassword(password) {
        setSubmitting(true);
        setSuccess(false);

        try {
            // Step 1: Generate hash and update local lime-community
            const passwordResult = await api.call(
                "lime-utils-admin",
                "set_root_password",
                { password }
            );

            if (passwordResult.status !== "ok") {
                throw new Error(
                    passwordResult.message || "Failed to set password"
                );
            }

            // Step 2: Read updated lime-community config with new hash
            const configResult = await api.call(
                "lime-mesh-config",
                "get_community_config",
                {}
            );

            if (!configResult.file_contents) {
                throw new Error("Failed to get community config");
            }

            // Step 3: Start mesh-wide config transaction
            const transactionResult = await api.call(
                "lime-mesh-config",
                "start_config_transaction",
                { file_contents: configResult.file_contents }
            );

            if (transactionResult.status !== "ok") {
                throw new Error(
                    transactionResult.message ||
                        "Failed to start config transaction"
                );
            }

            setSuccess(true);

            // Redirect to mesh-wide-config page after 2 seconds
            setTimeout(() => {
                route("/meshconfig");
            }, 2000);
        } catch (error) {
            console.error("Failed to set shared password:", error);
            setSuccess(false);
            throw error;
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <NetAdmin
            submitting={submitting}
            success={success}
            submitSharedPassword={submitSharedPassword}
        />
    );
};

export default NetAdminHOC;
