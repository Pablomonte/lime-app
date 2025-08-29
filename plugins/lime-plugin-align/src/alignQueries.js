import { useQuery } from "@tanstack/react-query";

import { useRealtimeQuery } from "utils/optimizedQuery";
import { getQueryErrorHandler } from "utils/queryErrorHandlers";
import { queryKeys } from "utils/queryKeys";

import { getAssocList, getMeshIfaces } from "./alignApi";
import { markAssociated, sortBySignal } from "./utils";

export function useMeshIfaces(queryConfig = {}) {
    return useQuery(queryKeys.meshIfaces(), getMeshIfaces, {
        onError: getQueryErrorHandler("meshIfaces"),
        ...queryConfig,
    });
}

async function _getAssocList(iface) {
    let assoclist = await getAssocList(iface);
    assoclist = sortBySignal(assoclist);
    assoclist = markAssociated(assoclist);
    return assoclist;
}

export function useAssocList(iface, queryConfig = {}) {
    // Association list is realtime signal strength data
    return useRealtimeQuery(
        queryKeys.assocList(iface),
        async () => await _getAssocList(iface),
        {
            onError: getQueryErrorHandler("assocList"),
            ...queryConfig,
        }
    );
}
