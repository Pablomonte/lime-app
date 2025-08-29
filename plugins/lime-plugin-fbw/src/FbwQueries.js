import { useMutation, useQuery } from "@tanstack/react-query";

import { useCriticalQuery, useOptimizedMutation } from "utils/optimizedQuery";
import queryCache from "utils/queryCache";
import { getQueryErrorHandler } from "utils/queryErrorHandlers";
import { queryKeys } from "utils/queryKeys";

import {
    createNetwork,
    dismissFbw,
    getStatus,
    scanRestart,
    scanStart,
    scanStop,
    setNetwork,
} from "./FbwApi";

export function useDismissFbw() {
    return useOptimizedMutation(dismissFbw, {
        onSuccess: () =>
            queryCache.setQueryData(queryKeys.fbwStatus(), { lock: false }),
    });
}

export function useCreateNetwork(params) {
    return useOptimizedMutation(createNetwork, params);
}

const _getApName = ({ ap = "", file = "" }) => {
    let getHostname = /(?<=host__)(.+)(?=__)/;
    let hostname = getHostname.exec(file)[1];
    return `${ap && ap !== ""}` ? `(${ap}) ${hostname}` : hostname;
};

const _getBssid = ({ file = "" }) => {
    let bssid = file.split("__").pop();
    return bssid;
};

async function _scanStatus() {
    let payload = await getStatus();
    return {
        scanned: payload.scanned || [],
        networks:
            payload?.networks?.map((net) => ({
                ...net,
                ap: _getApName(net),
                bssid: _getBssid(net),
            })) || [],
        status: payload.status || null,
        lock: payload.lock,
    };
}

export function useFbwStatus(params = {}) {
    // FBW scan status is critical during setup - needs fresh data
    return useCriticalQuery(queryKeys.fbwScanStatus(), _scanStatus, {
        onError: getQueryErrorHandler("fbwScanStatus"),
        ...params,
    });
}

// General status for banner - calls lime-fbw status directly
export function useFbwGeneralStatus(params = {}) {
    // FBW general status is critical for determining if setup is needed
    return useCriticalQuery(queryKeys.fbwStatus(), getStatus, {
        onError: getQueryErrorHandler("fbwStatus"),
        ...params,
    });
}

// Backend can return status false i some error is found doing
// start/stop/restart.
// This throw an error when status is false to be handled from the mutation
// onError API.
function _checkBackendResponseStatus(res) {
    if (res["status"]) return true;
    throw "Backend restart error";
}

export function useScanStart(params) {
    return useOptimizedMutation(async () => {
        _checkBackendResponseStatus(await scanStart());
    }, params);
}

export function useScanRestart(params) {
    return useOptimizedMutation(async () => {
        _checkBackendResponseStatus(await scanRestart());
    }, params);
}

export function useScanStop(params) {
    return useOptimizedMutation(async () => {
        _checkBackendResponseStatus(await scanStop());
    }, params);
}

export function useSetNetwork(params) {
    return useOptimizedMutation(setNetwork, params);
}
