import { useMutation, useQuery } from "@tanstack/react-query";

import { loadLeafLet } from "plugins/lime-plugin-locate/src/leafletUtils";
import {
    changeLocation,
    getLocation,
    getNodesandlinks,
} from "plugins/lime-plugin-locate/src/locateApi";

import queryCache from "utils/queryCache";
import { getQueryErrorHandler } from "utils/queryErrorHandlers";
import { queryKeys } from "utils/queryKeys";

export interface INodeLocation {
    location: {
        lon: string;
        lat: string;
    };
    default: boolean;
}

export function useLocation(params = {}) {
    return useQuery<INodeLocation>(queryKeys.locateLocation(), getLocation, {
        placeholderData: {
            default: false,
            location: {
                lon: "FIXME",
                lat: "FIXME",
            },
        },
        onError: getQueryErrorHandler("locateLocation"),
        ...params,
    });
}

export function useNodesandlinks(params = {}) {
    return useQuery(queryKeys.locateNodesAndLinks(), getNodesandlinks, {
        onError: getQueryErrorHandler("locateNodesAndLinks"),
        ...params,
    });
}

interface IChangeUserParams {
    lat: number;
    lon: number;
}

export function useChangeLocation(params) {
    return useMutation<void, unknown, IChangeUserParams, unknown>({
        mutationFn: changeLocation,
        onSuccess: (data: { lat: string; lon: string }) => {
            queryCache.setQueryData(
                queryKeys.locateLocation(),
                (oldData: INodeLocation) =>
                    oldData
                        ? {
                              ...oldData,
                              location: {
                                  lat: data.lat,
                                  lon: data.lon,
                              },
                          }
                        : oldData
            );
        },
        ...params,
    });
}

export function useLoadLeaflet(params = {}) {
    return useQuery(queryKeys.locateLeaflet(), loadLeafLet, {
        onError: getQueryErrorHandler("locateLeaflet"),
        ...params,
    });
}
