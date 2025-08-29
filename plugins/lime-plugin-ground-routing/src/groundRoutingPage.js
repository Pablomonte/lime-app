import { Trans } from "@lingui/macro";

import { useOptimizedQuery } from "utils/optimizedQuery";
import { queryKeys } from "utils/queryKeys";

import "./style.less";

const Page = () => {
    // Use TanStack Query for ground routing data
    const { data: groundRoutingData, isLoading } = useOptimizedQuery(
        queryKeys.groundRouting,
        async () => {
            const { fetchGroundRouting } = await import("./groundRoutingApi");
            return fetchGroundRouting();
        }
    );

    const preStyle = {
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        padding: "15px",
        border: "1px solid #ccc",
    };

    return (
        <div className="container" style={{ paddingTop: "100px" }}>
            <h4>
                <Trans>Ground Routing configuration</Trans>
            </h4>
            <pre style={preStyle}>
                {isLoading
                    ? "Loading..."
                    : JSON.stringify(groundRoutingData?.config, null, "  ")}
            </pre>
            <button onClick={() => window.location.reload()}>
                <Trans>Reload</Trans>
            </button>
        </div>
    );
};

// No more Redux needed!
export default Page;
