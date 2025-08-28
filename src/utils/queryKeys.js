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

    // Pirania plugin - matches ["pirania", "get_portal_config"]
    piraniaPortalConfig: () => ["pirania", "get_portal_config"],

    // Pirania plugin - matches ["pirania", "get_portal_page_content"]
    piraniaPortalContent: () => ["pirania", "get_portal_page_content"],

    // Pirania plugin - matches ["pirania", "list_vouchers"]
    piraniaVouchers: () => ["pirania", "list_vouchers"],

    // Pirania plugin - matches ["local-service", "logo_compression"]
    piraniaLogoCompression: () => ["local-service", "logo_compression"],

    // Locate plugin - matches ["lime-location", "get"]
    locateLocation: () => ["lime-location", "get"],

    // Locate plugin - matches ["lime-location", "all_nodes_and_links"]
    locateNodesAndLinks: () => ["lime-location", "all_nodes_and_links"],

    // Locate plugin - matches ["lime-location", "load_leaflet"]
    locateLeaflet: () => ["lime-location", "load_leaflet"],

    // Metrics plugin - matches ["lime-metrics", "get_metrics", ip]
    metricsForIp: (ip) => ["lime-metrics", "get_metrics", ip],

    // Metrics plugin - matches ["lime-metrics", "get_gateway"]
    metricsGateway: () => ["lime-metrics", "get_gateway"],

    // Metrics plugin - matches ["lime-metrics", "get_path"]
    metricsPath: () => ["lime-metrics", "get_path"],

    // Metrics plugin - matches ["lime-metrics", "get_loss", ip]
    metricsLossForIp: (ip) => ["lime-metrics", "get_loss", ip],
};
