import { Trans } from "@lingui/macro";

export const Footer = () => {
    const imgClass = "h-16";
    return (
        <div
            className={
                "w-full flex content-center items-center mt-8 py-4 bg-white gap-3"
            }
        >
            <div className="flex-1 flex justify-center">
                <img
                    src={"assets/icons/AlterMundiLogo.svg"}
                    className={imgClass}
                />
            </div>
            <div className={"flex-1 flex flex-col text-center text-xl"}>
                <div className={"italic font-normal text-2xl"}>
                    <Trans>Need support?</Trans>
                </div>
                <div>
                    <Trans>
                        Join{" "}
                        <a
                            className={"text-[#0198FE] hover:text-[#F39100]"}
                            href={"https://foro.librerouter.org"}
                        >
                            foro.librerouter.org
                        </a>
                    </Trans>
                </div>
                <div>
                    <Trans>
                        Visit{" "}
                        <a
                            className={"text-[#F39100] hover:text-[#0198FE]"}
                            href={"https://docs.altermundi.net"}
                        >
                            docs.altermundi.net
                        </a>
                    </Trans>
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                <img
                    src={"assets/icons/LibreRouterLogo.svg"}
                    className={imgClass}
                />
            </div>
        </div>
    );
};
