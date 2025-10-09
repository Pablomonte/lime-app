import { createHashHistory } from "history";

/**
 * Hash-based history for client-side routing
 *
 * Uses URL hash (#) for routing which allows client-side navigation
 * without requiring server-side route configuration.
 *
 * The base path '/app/' is handled by the server and <base href="/app/">
 * in the HTML. Hash routing automatically respects this base path.
 *
 * Example URLs:
 * - http://thisnode.info/app/#/notes
 * - http://thisnode.info/app/#/metrics
 * - http://thisnode.info/app/#/nodeadmin/hostname
 */
export const history = createHashHistory();
