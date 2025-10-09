import { Trans } from "@lingui/macro";

import { EthConfigButton } from "plugins/lime-plugin-rx/src/components/EthConfigButton";
import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PortsIcon } from "plugins/lime-plugin-rx/src/icons/portsIcon";
import { useEthConfig } from "plugins/lime-plugin-rx/src/rxQueries";
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
            className={"flex flex-wrap px-10 gap-4 justify-between"}
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
                    <div key={device} className={"flex flex-col h-fit"}>
                        <div className={"flex items-center gap-2 mb-1"}>
                            <h2 className={"font-bold"}>
                                {displayRole.toUpperCase()}
                            </h2>
                            <EthConfigButton
                                device={device}
                                currentRole={displayRole}
                            />
                        </div>
                        <h2>{device.toLowerCase()}</h2>
                        <div className={"flex flex-row gap-5 "}>
                            {portsForDevice.map((p: SwitchStatus) => {
                                const link =
                                    p.link?.toLowerCase() === "up"
                                        ? "fill-primary-dark"
                                        : "fill-disabled";
                                return (
                                    <div key={`${device}-${p.num}`}>
                                        <PortsIcon
                                            className={`h-7 w-7 ${link}`}
                                        />
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

export const Wired = () => {
    const { data: ethConfig, isLoading } = useEthConfig();

    const interfaces = ethConfig?.interfaces;

    return (
        <Section>
            <SectionTitle icon={<PortsIcon className={IconsClassName} />}>
                <Trans>Wired connections</Trans>
            </SectionTitle>
            <div className={"mt-4"}>
                {isLoading ? (
                    <span>Loading...</span>
                ) : interfaces?.length ? (
                    <Ports switches={interfaces} />
                ) : (
                    <div className={"flex-1 flex justify-center"}>
                        No wired connections found
                    </div>
                )}
            </div>
        </Section>
    );
};
