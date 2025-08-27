import { useMutation, useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";
import { queryKeys } from "utils/queryKeys";

import {
    downloadRelease,
    getDownloadStatus,
    getNewVersion,
    getUpgradeInfo,
    upgradeConfirm,
    upgradeFirmware,
    upgradeRevert,
} from "./firmwareApi";

export function useUpgradeInfo(params) {
    return useQuery(queryKeys.upgradeInfo(), getUpgradeInfo, params);
}

function resetSuCounter() {
    queryCache.setQueryData(queryKeys.upgradeInfo(), (oldInfo) => ({
        ...oldInfo,
        suCounter: -1,
    }));
}

export function useUpgradeConfirm() {
    return useMutation(upgradeConfirm, {
        onSuccess: resetSuCounter,
    });
}

export function useUpgradeRevert() {
    return useMutation(upgradeRevert, {
        onSuccess: resetSuCounter,
    });
}

export function useNewVersion(params) {
    return useQuery(queryKeys.newVersion(), getNewVersion, params);
}

export function useDownloadStatus(params) {
    return useQuery(queryKeys.downloadStatus(), getDownloadStatus, params);
}

export function useDownloadRelease() {
    return useMutation(downloadRelease, {
        onSuccess: () =>
            queryCache.setQueryData(queryKeys.downloadStatus(), {
                download_status: "downloading",
            }),
    });
}

export function useUpgradeFirwmare() {
    return useMutation(upgradeFirmware);
}
