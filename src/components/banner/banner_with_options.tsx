import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";

import style from "./style.less";

type BannerWithOptionsProps = {
    title: ComponentChildren;
    description?: ComponentChildren;
    cancelOption: ComponentChildren;
    onNotShowAgain: (e: Event) => void;
    options: ComponentChildren[];
};

export const BannerWithOptions = ({
    title,
    description,
    cancelOption,
    onNotShowAgain,
    options,
}: BannerWithOptionsProps) => (
    <div className={style.banner}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {options.map((option, i) => {
            return <div key={i}>{option}</div>;
        })}
        {cancelOption}
        <div className={style.dontShowAgain}>
            <label>
                <input
                    type="checkbox"
                    name="not-show-again"
                    onInput={onNotShowAgain}
                />
                <Trans>Don't show this message again</Trans>
            </label>
        </div>
    </div>
);
