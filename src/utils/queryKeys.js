// Centralized query keys for better maintainability
// These match exactly the existing conventions to ensure compatibility
export const queryKeys = {
    // Auth related - matches ["session", "get"]
    session: () => ["session", "get"],

    // System related - matches ["system", "board"]
    board: () => ["system", "board"],

    // Community settings - matches ["lime-utils", "get_community_settings"]
    communitySettings: () => ["lime-utils", "get_community_settings"],

    // Network related - matches ["bat-hosts", "get_bathost", mac, outgoingIface]
    batHost: (mac, outgoingIface) => [
        "bat-hosts",
        "get_bathost",
        mac,
        outgoingIface,
    ],

    // Internet connectivity - matches ["check-internet", "is_connected"]
    internet: () => ["check-internet", "is_connected"],

    // Changes tracking - matches ["changes-need-reboot"]
    changes: () => ["changes-need-reboot"],
};
