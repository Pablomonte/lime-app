import { useQuery } from "@tanstack/react-query";

import queryCache from "utils/queryCache";
import { queryKeys } from "utils/queryKeys";
import { useRealtimeQuery } from "utils/optimizedQuery";

import { getGateway, getLoss, getMetrics, getPath } from "./metricsApi";

export function useMetrics(ip, params = {}) {
    return useRealtimeQuery(queryKeys.metricsForIp(ip), () => getMetrics(ip), {
        retry: false,
        enabled: !!ip,
        ...params,
    });
}

export const getAllMetrics = async (ips) => {
    const metrics = [];
    for (const ip of ips) {
        const metric = await queryCache.fetchQuery(queryKeys.metricsForIp(ip));
        metrics.push({ ip: metric });
    }
    return metrics;
};

export function useAllMetrics(ips, params) {
    return useQuery(
        queryKeys.metricsForIp(ips),
        (query) => getAllMetrics(query.queryKey[2]),
        {
            retry: false,
            enabled: ips && ips.length > 0,
            ...params,
        }
    );
}

export function useGateway(params = {}) {
    return useRealtimeQuery(queryKeys.metricsGateway(), getGateway, params);
}

export function usePath(params = {}) {
    return useRealtimeQuery(queryKeys.metricsPath(), getPath, params);
}

export function useLoss(ip, params = {}) {
    return useRealtimeQuery(queryKeys.metricsLossForIp(ip), () => getLoss(ip), {
        retry: false,
        enabled: !!ip,
        ...params,
    });
}

export const getAllLoss = async (nodes) => {
    let losses = {};
    for (const node of nodes) {
        const queryKey = queryKeys.metricsLossForIp(node.ip);
        await queryCache.invalidateQueries(queryKey);
        losses[node.ip] = await queryCache.fetchQuery(queryKey);
    }
    return losses;
};

export function usePathLoss(nodes, params) {
    return useQuery(
        queryKeys.metricsLossForIp(nodes),
        (query) => getAllLoss(query.queryKey[2]),
        {
            retry: false,
            enabled: nodes && nodes.length > 0,
            ...params,
        }
    );
}
