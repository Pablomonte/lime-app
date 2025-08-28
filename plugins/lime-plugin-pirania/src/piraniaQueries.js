import { useMutation, useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";
import { queryKeys } from "utils/queryKeys";

import {
    addVoucher,
    createCompression,
    getPortalConfig,
    getPortalContent,
    invalidate,
    listVouchers,
    rename,
    setPortalConfig,
    setPortalContent,
} from "./piraniaApi";

export const usePortalConfig = () =>
    useQuery(queryKeys.piraniaPortalConfig(), getPortalConfig);

export const useSetPortalConfig = () =>
    useMutation(setPortalConfig, {
        onSuccess: () =>
            queryCache.invalidateQueries(queryKeys.piraniaPortalConfig()),
    });

export const usePortalContent = () =>
    useQuery(queryKeys.piraniaPortalContent(), getPortalContent);

export const useSetPortalContent = () =>
    useMutation(setPortalContent, {
        onSuccess: () =>
            queryCache.invalidateQueries(queryKeys.piraniaPortalContent()),
    });

export const useLogoCompression = () =>
    useQuery(queryKeys.piraniaLogoCompression());

export const useCreateCompression = () =>
    useMutation(createCompression, {
        onSuccess: (compression) =>
            queryCache.setQueryData(
                queryKeys.piraniaLogoCompression(),
                compression
            ),
    });

export function useListVouchers() {
    return useQuery(queryKeys.piraniaVouchers(), listVouchers, {});
}

export function useAddVoucher() {
    return useMutation(addVoucher, {
        onSuccess: (data) => {
            queryCache.invalidateQueries(queryKeys.piraniaVouchers());
            return data;
        },
    });
}

export function useRename() {
    return useMutation(rename, {
        onSuccess: (data) => {
            queryCache.invalidateQueries(queryKeys.piraniaVouchers());
            return data;
        },
    });
}

export function useInvalidate() {
    return useMutation(invalidate, {
        onSuccess: (data) => {
            queryCache.invalidateQueries(queryKeys.piraniaVouchers());
            return data;
        },
    });
}
