import { Trans, plural, t } from "@lingui/macro";
import { Fragment } from "preact";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { GearIcon } from "plugins/lime-plugin-rx/src/icons/gearIcon";
import { useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";

import { useBoardData } from "utils/queries";
import { IGetBoardDataResponse } from "utils/types";

const toHHMMSS = (seconds: string, plus: number) => {
    const secNum = parseInt(seconds, 10) + plus;
    const days = Math.floor(secNum / 86400);
    const hours = Math.floor(secNum / 3600) % 24;
    const mins = Math.floor(secNum / 60) % 60;
    const secs = secNum % 60;
    const daysText = days
        ? plural(days, { one: "# day", other: "# days" })
        : null;
    const hoursText = hours
        ? plural(hours, { one: "# hour", other: "# hours" })
        : null;
    const minsText = mins
        ? plural(mins, { one: "# minute", other: "# minutes" })
        : null;
    const secsText = secs
        ? plural(secs, { one: "# second", other: "# seconds" })
        : null;
    const allTexts = [daysText, hoursText, minsText, secsText];
    return allTexts.filter((x) => x !== null).join(", ");
};

const SystemInfo = () => {
    const { data: node } = useNodeStatus();
    const { data: bd } = useBoardData();

    const boardData = bd as IGetBoardDataResponse;
    const secNum = parseInt(node?.uptime, 10);
    const attributes = [
        {
            label: t`Uptime`,
            value: toHHMMSS(node?.uptime, 0),
        },
        { label: t`Device`, value: boardData.board_name },
        { label: t`Firmware`, value: boardData.release.description },
    ];
    return (
        <div className="flex flex-wrap gap-6 justify-around px-6">
            {attributes.map((attribute, i) => (
                <div key={i} className="flex flex-col items-center text-center min-w-[150px]">
                    <div className="font-bold text-2xl mb-2">
                        {attribute.label}
                    </div>
                    <div className="text-xl text-gray-700">
                        {attribute.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const System = () => {
    const { isLoading: isLoadingNodeStatus } = useNodeStatus();
    const { isLoading: isLoadingBoardData } = useBoardData();

    const isLoading = isLoadingBoardData || isLoadingNodeStatus;

    return (
        <Section className={"border border-primary-dark rounded-md mx-4 mb-6"}>
            <SectionTitle icon={<GearIcon className={IconsClassName} />}>
                <Trans>System</Trans>
            </SectionTitle>
            <div className={"mt-4 pb-4"}>
                {isLoading ? (
                    <div className="flex justify-center text-gray-500">
                        Loading...
                    </div>
                ) : (
                    <SystemInfo />
                )}
            </div>
        </Section>
    );
};
