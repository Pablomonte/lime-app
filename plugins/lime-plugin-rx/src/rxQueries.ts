import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { setEthConfig } from "./ethConfigApi";
import { getEthConfig, getInternetStatus, getNodeStatus } from "./rxApi";
import { ISetEthConfigParams } from "./rxTypes";

const refetchInterval = 2000;

export function useNodeStatus(params?) {
    return useQuery(["lime-rx", "node-status"], getNodeStatus, {
        enabled: true,
        refetchInterval,
        ...params,
    });
}

export function useInternetStatus(params?) {
    return useQuery(["lime-rx", "internet-status"], getInternetStatus, {
        placeholderData: {
            IPv4: { working: null },
            IPv6: { working: null },
            DNS: { working: null },
        },
        enabled: true,
        refetchInterval,
        ...params,
    });
}

export function useEthConfig(params?) {
    return useQuery(["lime-eth-config", "get_eth_config"], getEthConfig, {
        enabled: true,
        refetchInterval,
        ...params,
    });
}

export function useSetEthConfig() {
    const queryClient = useQueryClient();
    return useMutation((params: ISetEthConfigParams) => setEthConfig(params), {
        mutationKey: ["lime-eth-config", "set_eth_config"],
        onSuccess: async () => {
            // Simply invalidate - the automatic polling will refetch
            // Network reconfiguration may take a few seconds to complete
            queryClient.invalidateQueries(["lime-rx", "node-status"]);
            queryClient.invalidateQueries([
                "lime-eth-config",
                "get_eth_config",
            ]);
        },
    });
}
