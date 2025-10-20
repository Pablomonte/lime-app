import { Trans } from "@lingui/macro";

import { GlobeIcon } from "components/icons/globeIcon";

import { EthConfigButton } from "plugins/lime-plugin-rx/src/components/EthConfigButton";
import { IconsClassName } from "plugins/lime-plugin-rx/src/components/components";
import { PortsIcon } from "plugins/lime-plugin-rx/src/icons/portsIcon";
import { useEthConfig, useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";
import { SwitchStatus } from "plugins/lime-plugin-rx/src/rxTypes";

const Ports = ({ switches }: { switches: SwitchStatus[] }) => {
    // Filter out CPU entries first
    const nonCpuSwitches = switches.filter(
        (sw) => sw.role.toLowerCase() !== "cpu"
    );

    // Group by device
    const portsByDevice = nonCpuSwitches.reduce((acc, obj) => {
        const { device } = obj;
        if (!acc[device]) {
            acc[device] = [];
        }
        acc[device].push(obj);
        return acc;
    }, {} as Record<string, SwitchStatus[]>);

    return (
        <div
            className={"flex flex-wrap gap-8 justify-around px-4"}
            data-testid="ports-container"
        >
            {Object.keys(portsByDevice).map((device) => {
                const portsForDevice = portsByDevice[device];
                if (!portsForDevice || !portsForDevice[0]) return null;

                const firstPort = portsForDevice[0];

                // Show eth_role if it's customized (not "default"), otherwise show current role
                const displayRole =
                    firstPort.eth_role && firstPort.eth_role !== "default"
                        ? firstPort.eth_role
                        : firstPort.role;

                return (
                    <div key={device} className={"flex flex-col items-center"}>
                        <div className={"flex items-center gap-2 mb-1"}>
                            <h2 className={"font-bold text-2xl"}>
                                {displayRole.toUpperCase()}
                            </h2>
                            <EthConfigButton
                                device={device}
                                currentRole={displayRole}
                            />
                        </div>
                        <div className={"flex flex-row gap-3"}>
                            {portsForDevice.map((p: SwitchStatus) => {
                                const link =
                                    p.link?.toLowerCase() === "up"
                                        ? "fill-primary-dark"
                                        : "fill-disabled";
                                // Extract base name and construct port label
                                // e.g., "eth0.1" + num=2 -> "eth2"
                                const deviceLower = p.device.toLowerCase();
                                // Remove all digits and dots from device name to get base (eth0.1 -> eth)
                                const deviceBase = deviceLower.replace(/[\d.]+$/, '');
                                const portLabel = `${deviceBase}${p.num}`;
                                return (
                                    <div key={`${device}-${p.num}`} className={"flex flex-col items-center"}>
                                        <PortsIcon
                                            className={`h-8 w-8 ${link}`}
                                        />
                                        <span className={"text-sm mt-1"}>
                                            {portLabel}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const IpAddresses = () => {
    const { data: status } = useNodeStatus();
    const ips = status?.ips || [];

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-x-4 mb-2">
                <span className={"text-primary-dark stroke-current"}>
                    <GlobeIcon className={IconsClassName} />
                </span>
                <h1 className="text-4xl font-bold">
                    <Trans>IP Addresses</Trans>
                </h1>
            </div>
            {ips.length > 0 ? (
                ips.map((ip, index) => (
                    <div key={index} className="flex flex-row gap-2 items-baseline">
                        <div className="font-bold text-2xl whitespace-nowrap">
                            IPv{ip.version}:
                        </div>
                        <div className="text-xl text-gray-700 break-all">
                            {ip.address}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-gray-500 text-xl">No IP addresses</div>
            )}
        </div>
    );
};

export const Wired = () => {
    const { data: ethConfig, isLoading: ethLoading } = useEthConfig();
    const { isLoading: statusLoading } = useNodeStatus();

    const interfaces = ethConfig?.interfaces;
    const isLoading = ethLoading || statusLoading;

    return (
        <div className={"w-full border border-primary-dark rounded-md mx-4 mb-6"}>
            {isLoading ? (
                <div className="flex justify-center text-gray-500 py-8">
                    Loading...
                </div>
            ) : (
                <div className="flex flex-row items-start gap-3 pt-6 pb-4 px-6">
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-x-4 mb-4">
                            <span className={"text-primary-dark fill-current"}>
                                <PortsIcon className={IconsClassName} />
                            </span>
                            <h1 className="text-4xl font-bold">
                                <Trans>Wired connections</Trans>
                            </h1>
                        </div>
                        {interfaces?.length ? (
                            <Ports switches={interfaces} />
                        ) : (
                            <div className={"flex justify-center text-gray-500 text-xl"}>
                                No wired connections
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col">
                        <IpAddresses />
                    </div>
                </div>
            )}
        </div>
    );
};
