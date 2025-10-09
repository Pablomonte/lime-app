import { Trans } from "@lingui/macro";
import { Fragment, useCallback } from "react";

import { GlobeIcon } from "components/icons/globeIcon";
import Loading from "components/loading";

import {
    usePath,
    usePathLoss,
} from "plugins/lime-plugin-metrics/src/metricsQueries";
import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import LineChart from "plugins/lime-plugin-rx/src/components/internetPathChart";
import { InternetStatus } from "plugins/lime-plugin-rx/src/components/internetStatus";
import { SignalColor } from "plugins/lime-plugin-rx/src/components/signalColor";
import { AlignIcon } from "plugins/lime-plugin-rx/src/icons/alignIcon";
import { PathIcon } from "plugins/lime-plugin-rx/src/icons/pathIcon";
import { useInternetStatus, useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";
import { IGetInternetStatus } from "plugins/lime-plugin-rx/src/rxTypes";

import { useBatHost } from "utils/queries";

function stripIface(hostIface) {
    return hostIface.split("_wlan")[0].replace("_", "-");
}

export const InternetPath = () => {
    const {
        data: path,
        isLoading: pathIsLoading,
        isError: pathError,
    } = usePath({
        refetchOnWindowFocus: false,
        enabled: true,
    });

    const pathLoss = Array.isArray(path)
        ? path
              .map((station) => {
                  return {
                      ip:
                          station &&
                          typeof station === "object" &&
                          "ip" in station
                              ? station.ip
                              : "",
                  };
              })
              .slice()
              .reverse()
        : [];

    const { refetch: refetchLosses } = usePathLoss(pathLoss, {
        refetchOnWindowFocus: false,
        enabled: false,
        initialData: [],
    });

    const { data: internet, isLoading: internetStatusLoading } =
        useInternetStatus({
            structuralSharing: (
                oldData: IGetInternetStatus,
                newData: IGetInternetStatus
            ) => {
                if (
                    // If is the first execution and there are no internet
                    (!oldData &&
                        !(newData.IPv4.working || newData.IPv6.working)) ||
                    // If the old data and new data are different
                    (oldData &&
                        (oldData.IPv4.working || oldData.IPv6.working) !==
                            (newData.IPv4.working || newData.IPv6.working))
                ) {
                    if (refetchLosses) refetchLosses();
                }
                return newData;
            },
        });

    const checkLosses = useCallback(async () => {
        refetchLosses();
    }, [refetchLosses]);

    const workingInternet =
        !internetStatusLoading &&
        (internet.IPv4.working || internet.IPv6.working);

    const { data: status, isLoading: statusLoading } = useNodeStatus();

    const hasMostActive = !!status?.most_active?.iface;
    const { data: bathost } = useBatHost(
        status?.most_active && status.most_active.station_mac,
        status?.most_active && status.most_active.iface,
        { enabled: hasMostActive }
    );

    const traffic = hasMostActive
        ? Math.round(
              (status.most_active.rx_bytes + status.most_active.tx_bytes) /
                  1024 /
                  1024
          )
        : 0;

    // Conditional rendering for las known path
    let pathComponent = (
        <div
            className={
                "flex-1 flex flex-col items-center justify-center text-center text-gray-500 gap-3"
            }
        >
            <Loading />
            <Trans>
                Loading <br />
                last internet path...
            </Trans>
        </div>
    );
    if (pathError) {
        pathComponent = (
            <div
                className={
                    "flex-1 flex flex-col items-center justify-center text-center text-gray-500 gap-3"
                }
            >
                <GlobeIcon
                    size={"30px"}
                    className={"stroke-gray-400 fill-gray-400"}
                />
                <Trans>
                    Error retrieving
                    <br />
                    last internet path
                </Trans>
            </div>
        );
    } else if (!pathIsLoading && path) {
        pathComponent = (
            <span onClick={checkLosses}>
                <LineChart
                    nodes={Array.isArray(path) ? path : []}
                    internet={workingInternet}
                />
            </span>
        );
    }

    return (
        <Section className={"border border-primary-dark rounded-md mx-4 mb-6 bg-primary-card"}>
            <div className="flex flex-row items-start gap-3 pt-6 pb-4 px-6">
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-x-4 mb-4">
                        <span className={"text-primary-dark fill-current"}>
                            <PathIcon className={IconsClassName} />
                        </span>
                        <h1 className="text-4xl font-bold">
                            <Trans>Path to Internet</Trans>
                        </h1>
                    </div>
                    <div className="flex justify-center py-2">
                        {pathComponent}
                    </div>
                </div>
                {hasMostActive && !statusLoading && (
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-x-4 mb-4">
                            <span className={"text-primary-dark fill-current"}>
                                <AlignIcon className={IconsClassName} />
                            </span>
                            <h1 className="text-4xl font-bold">
                                <Trans>Alignment</Trans>
                            </h1>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <div className={"flex flex-col items-center"}>
                                <div className={"text-8xl font-bold text-primary"}>
                                    <SignalColor
                                        className={"font-bold"}
                                        signal={+status.most_active.signal}
                                    />
                                </div>
                                <div className={"text-3xl mt-2"}>
                                    {status.most_active?.chains &&
                                        status.most_active.chains.map(
                                            (chain, i) => (
                                                <span key={i}>
                                                    <SignalColor
                                                        className={"font-bold"}
                                                        signal={chain}
                                                    />
                                                    {i !==
                                                        status.most_active.chains
                                                            .length -
                                                            1 && " / "}
                                                </span>
                                            )
                                        )}
                                </div>
                            </div>
                            <div className={"flex flex-col text-2xl gap-1 min-w-0 flex-1"}>
                                <div className={"font-bold text-3xl mb-2"}>
                                    <Trans>Most active link</Trans>
                                </div>
                                <div className={"text-primary font-bold min-h-[2rem]"}>
                                    {bathost && bathost.hostname ? (
                                        <span>{stripIface(bathost.hostname)}</span>
                                    ) : (
                                        <span className="withLoadingEllipsis">
                                            <Trans>Fetching name</Trans>
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Trans>Interface: </Trans>
                                    <span className={"font-bold"}>
                                        {status.most_active.iface}
                                    </span>
                                </div>
                                <div>
                                    <Trans>Traffic: </Trans>
                                    <span className={"font-bold"}>{traffic}MB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <InternetStatus data={internet} />
        </Section>
    );
};
