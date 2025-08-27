import { Trans } from "@lingui/macro";
import { Fragment } from "preact";
import { useForm } from "react-hook-form";

import {
    MaxLengthErrorMsg,
    MaxLengthMsg,
    RequiredErrorMsg,
} from "components/form";
import Loading from "components/loading";

import { ConfigPageLayout } from "plugins/lime-plugin-node-admin/src/layouts";

import { useListVouchers, useRename } from "../piraniaQueries";

const EditVoucherForm = ({ name, submitVoucher, isSubmitting }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { name },
    });
    return (
        <Fragment>
            <form className="flex-grow-1">
                <label htmlFor="name">
                    <Trans>Description</Trans>
                </label>
                <span>
                    <MaxLengthMsg length={100} />
                </span>
                <textarea
                    id="name"
                    {...register("name", { required: true, maxLength: 100 })}
                    className="w-100"
                />
                {errors.name?.type === "required" && <RequiredErrorMsg />}
                {errors.name?.type === "maxLength" && (
                    <MaxLengthErrorMsg length={100} />
                )}
            </form>
            <div className="d-flex">
                <div className="ml-auto">
                    {!isSubmitting && (
                        <button
                            // @ts-ignore
                            onClick={handleSubmit(submitVoucher)}
                            className="ml-auto"
                        >
                            <Trans>Save</Trans>
                        </button>
                    )}
                    {isSubmitting && <Loading />}
                </div>
            </div>
        </Fragment>
    );
};

const EditVoucher = () => {
    // Get id parameter from URL hash (e.g., #/access/edit/voucher123)
    const currentUrl = window.location.hash;
    const urlParts = currentUrl.split("/");
    const id = urlParts[3]; // access/edit/ID

    const {
        mutate: renameVoucher,
        isLoading: isSubmitting,
        isSuccess,
        isError,
    } = useRename();
    const { data: vouchers, isLoading } = useListVouchers();
    const voucher = vouchers && vouchers.filter((v) => v.id === id)[0];

    const submitVoucher = async ({ name }) => {
        return renameVoucher({
            id: voucher.id,
            name,
        });
    };

    return (
        <ConfigPageLayout
            {...{
                isLoading,
                isSuccess,
                isError,
                title: <Trans>Edit Voucher</Trans>,
                backUrl: `/access/view/${id}`,
            }}
        >
            <EditVoucherForm
                name={voucher?.name}
                submitVoucher={submitVoucher}
                isSubmitting={isSubmitting}
            />
        </ConfigPageLayout>
    );
};

export default EditVoucher;
