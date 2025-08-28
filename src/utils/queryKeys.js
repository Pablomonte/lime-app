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

    // Align plugin - matches ["lime-utils", "get_mesh_ifaces"]
    meshIfaces: () => ["lime-utils", "get_mesh_ifaces"],

    // Align plugin - matches ["iwinfo", "assoclist", iface]
    assocList: (iface) => ["iwinfo", "assoclist", iface],

    // Firmware plugin - matches ["lime-utils", "get_upgrade_info"]
    upgradeInfo: () => ["lime-utils", "get_upgrade_info"],

    // Firmware plugin - matches ["eupgrade", "is_new_version_available"]
    newVersion: () => ["eupgrade", "is_new_version_available"],

    // Firmware plugin - matches ["eupgrade", "download_status"]
    downloadStatus: () => ["eupgrade", "download_status"],

    // FBW plugin - matches ["lime-fbw", "status"]
    fbwStatus: () => ["lime-fbw", "status"],

    // FBW plugin - matches ["lime-fbw", "scan-status"]
    fbwScanStatus: () => ["lime-fbw", "scan-status"],

    // Node-admin plugin - matches ["lime-utils", "get_wifi_data"]
    wifiData: () => ["lime-utils", "get_wifi_data"],

    // Node-admin plugin - matches ["lime-utils-admin", "get_wifi_data"]
    adminWifiData: () => ["lime-utils-admin", "get_wifi_data"],

    // Node-admin plugin - matches ["lime-utils", "hotspot_wwan_get_status"]
    hotspotStatus: () => ["lime-utils", "hotspot_wwan_get_status"],

    // Remotesupport plugin - matches ["tmate", "get_session"]
    tmateSession: () => ["tmate", "get_session"],
};
