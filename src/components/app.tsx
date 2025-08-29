import { fromNavigator } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import { QueryClientProvider } from "@tanstack/react-query";
// React Query DevTools removed for production build
import Router from "preact-router";
import { useEffect } from "preact/hooks";

import ErrorBoundary from "components/ErrorBoundary";
import QueryErrorBoundary from "components/QueryErrorBoundary";
import { ToastProvider } from "components/toast/toastProvider";

import { Menu } from "containers/Menu";
import { RebootPage } from "containers/RebootPage";
import SubHeader from "containers/SubHeader";

import { AppContextProvider } from "utils/app.context";
import { useBoardData, useLogin, useSession } from "utils/queries";
import queryCache from "utils/queryCache";
import { CommunityProtectedRoute, Redirect, Route } from "utils/routes";

import { plugins } from "../config";
import i18n, { dynamicActivate } from "../i18n";
import { Header } from "./header";

const Routes = () => (
    // @ts-ignore
    <Router>
        {/* Public pages, don't need to be authenticated */}
        {plugins
            .filter((plugin) => !plugin.isCommunityProtected)
            .map((Component, i) => (
                <Route key={i} path={Component.name.toLowerCase()}>
                    <QueryErrorBoundary>
                        <Component.page />
                    </QueryErrorBoundary>
                </Route>
            ))}
        {/* Protected pages, need to be authenticated */}
        {plugins
            .filter((plugin) => plugin.isCommunityProtected)
            .map((Component, i) => (
                <CommunityProtectedRoute
                    key={i}
                    path={Component.name.toLowerCase()}
                >
                    <QueryErrorBoundary>
                        <Component.page />
                    </QueryErrorBoundary>
                </CommunityProtectedRoute>
            ))}
        {/* Additional plugins routes */}
        {plugins
            .filter((plugin) => plugin.additionalRoutes)
            .map((plugin) => plugin.additionalRoutes)
            .flat()
            .map(([path, Component], index) => (
                <Route path={path} key={index}>
                    <QueryErrorBoundary>
                        <Component />
                    </QueryErrorBoundary>
                </Route>
            ))}
        {/* Additional plugins protected routes */}
        {plugins
            .filter((plugin) => plugin.additionalProtectedRoutes)
            .map((plugin) => plugin.additionalProtectedRoutes)
            .flat()
            .map(([path, Component], index) => (
                <CommunityProtectedRoute path={path} key={index}>
                    <QueryErrorBoundary>
                        <Component />
                    </QueryErrorBoundary>
                </CommunityProtectedRoute>
            ))}
        <CommunityProtectedRoute path={"/reboot"}>
            <QueryErrorBoundary>
                <RebootPage />
            </QueryErrorBoundary>
        </CommunityProtectedRoute>
        {/* @ts-ignore */}
        <Redirect default path={"/"} to={"rx"} />
    </Router>
);

const App = () => {
    const { data: session } = useSession();
    const { mutate: login } = useLogin();
    const { data: boardData } = useBoardData({
        enabled: session?.username != null,
    });

    useEffect(() => {
        if (session?.username === null) {
            login({ username: "lime-app", password: "generic" });
        }
    }, [session, login]);

    if (!session?.username || !boardData) {
        return <div>Loading...</div>;
    }

    return (
        <div id="app">
            {/* ReactQueryDevtools removed for production */}
            <Header Menu={Menu} />
            <SubHeader />
            <div id="content">
                <Routes />
            </div>
        </div>
    );
};

const AppDefault = () => {
    useEffect(() => {
        dynamicActivate(fromNavigator().split("-")[0] as Locales);
    }, []);
    return (
        <ErrorBoundary>
            <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
                <QueryClientProvider client={queryCache}>
                    <AppContextProvider>
                        <ToastProvider>
                            <App />
                        </ToastProvider>
                    </AppContextProvider>
                </QueryClientProvider>
            </I18nProvider>
        </ErrorBoundary>
    );
};

export default AppDefault;
