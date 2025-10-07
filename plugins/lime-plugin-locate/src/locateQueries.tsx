import { useMutation, useQuery } from "@tanstack/react-query";

import { loadLeafLet } from "plugins/lime-plugin-locate/src/leafletUtils";
import {
    changeLocation,
    getLocation,
    getNodesandlinks,
} from "plugins/lime-plugin-locate/src/locateApi";

import { useOptimizedQuery } from "utils/optimizedQuery";
import queryCache from "utils/queryCache";
import { queryKeys } from "utils/queryKeys";

export interface INodeLocation {
    location: {
        lon: string;
        lat: string;
    };
    default: boolean;
}

export function useLocation(params = {}) {
    return useOptimizedQuery(queryKeys.locateLocation(), getLocation, {
        retry: false,
        placeholderData: {
            default: false,
            location: {
                lon: "FIXME",
                lat: "FIXME",
            },
        },
        ...params,
    });
}

export function useNodesandlinks(params = {}) {
    return useOptimizedQuery(
        queryKeys.locateNodesAndLinks(),
        getNodesandlinks,
        {
            retry: false,
            ...params,
        }
    );
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
    return useOptimizedQuery(queryKeys.locateLeaflet(), loadLeafLet, {
        retry: false,
        ...params,
    });
}
