import { EthConfigProgressPage } from "./src/components/EthConfigProgressPage";
import { RxMenu } from "./src/rxMenu";
import Rx from "./src/rxPage";

// Wrapper to pass query params as props
const EthConfigProgressPageWrapper = ({ device, role, password }: any) => (
    <EthConfigProgressPage device={device} role={role} password={password} />
);

export default {
    name: "Rx",
    page: Rx,
    menu: RxMenu,
    additionalProtectedRoutes: [
        ["rx/configuring", EthConfigProgressPageWrapper],
    ],
} as LimePlugin;
