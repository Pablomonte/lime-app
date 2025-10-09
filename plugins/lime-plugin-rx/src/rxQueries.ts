import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { setEthConfig } from "./ethConfigApi";
import { getInternetStatus, getNodeStatus } from "./rxApi";
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

export function useSetEthConfig() {
    const queryClient = useQueryClient();
    return useMutation((params: ISetEthConfigParams) => setEthConfig(params), {
        mutationKey: ["lime-eth-config", "set_eth_config"],
        onSuccess: async (data, variables) => {
            console.log("Ethernet config changed:", variables);
            console.log("Backend response:", data);

            // Simply invalidate - the automatic polling will refetch
            // Network reconfiguration may take a few seconds to complete
            console.log(
                "Invalidating cache - automatic polling will update UI..."
            );
            queryClient.invalidateQueries(["lime-rx", "node-status"]);
        },
    });
}
