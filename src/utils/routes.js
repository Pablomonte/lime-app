import { cloneElement } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";

import { useFbwGeneralStatus } from "../../plugins/lime-plugin-fbw/src/FbwQueries";
import { FbwInitialOverlay } from "../components/FbwInitialOverlay";
import { SharedPasswordLogin } from "../containers/SharedPasswordLogin";
import { useAppContext } from "./app.context";
import { useSession } from "./queries";

export const Route = ({ path, children, ...childrenProps }) => {
    const { data: fbwStatus } = useFbwGeneralStatus({
        // Only check FBW status on relevant routes
        enabled:
            path !== "firmware" &&
            path !== "releaseInfo" &&
            !path.startsWith("firstbootwizard"),
    });
    const { fbwCanceled, cancelFbw } = useAppContext();
    const childrenWithProps = cloneElement(children, { ...childrenProps });

    // Show initial FBW overlay when setup is needed
    if (
        fbwStatus &&
        typeof fbwStatus === "object" &&
        "lock" in fbwStatus &&
        fbwStatus.lock &&
        !fbwCanceled &&
        path !== "firmware" &&
        path !== "releaseInfo" &&
        !path.startsWith("firstbootwizard")
    ) {
        return <FbwInitialOverlay fbwStatus={fbwStatus} onCancel={cancelFbw} />;
    }

    return childrenWithProps;
};

export const CommunityProtectedRoute = ({
    path,
    children,
    ...childrenProps
}) => {
    const { data: session, isLoading } = useSession();
    const childrenWithProps = cloneElement(children, { ...childrenProps });

    // Show loading state while session is being fetched
    if (isLoading) {
        return null; // or a loading spinner
    }

    // Safe check: session should now have placeholderData, but be defensive
    if (session?.username !== "root") {
        return (
            <Route path={path}>
                <SharedPasswordLogin />
            </Route>
        );
    }
    return childrenWithProps;
};

export const Redirect = ({ to }) => {
    useEffect(() => {
        route(to, true);
    }, [to]);
    return null;
};
