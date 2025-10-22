import { Trans } from "@lingui/macro";
import { LatLngExpression, icon } from "leaflet";
import { useEffect, useRef, useState } from "preact/hooks";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";

import { Loading } from "components/loading";

import {
    useChangeLocation,
    useLoadLeaflet,
    useLocation,
} from "plugins/lime-plugin-locate/src/locateQueries";

import { homeIcon } from "./leafletUtils";
import style from "./style.less";

const openStreetMapTileString = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

const gmSatellite = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
const gmHybrid = "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}";
const gmSubdomains = ["mt0", "mt1", "mt2", "mt3"];

export const LocatePage = () => {
    const {
        isError: isAssetError,
        isFetchedAfterMount: assetsLoaded,
        isLoading: isLoadingAssets,
    } = useLoadLeaflet({
        refetchOnWindowFocus: false,
    });

    const {
        data: nodeLocation,
        isLoading: isLoadingLocation,
    } = useLocation({
        enabled: assetsLoaded,
    });

    const { mutate: changeLocation, isLoading: submitting } = useChangeLocation(
        {
            onSettled: () => {
                toogleEdition();
            },
        }
    );

    const loading = isLoadingLocation || isLoadingAssets;
    const isCommunityLocation = nodeLocation.default;
    const stationLat =
        nodeLocation.location.lat !== "FIXME"
            ? nodeLocation.location.lat
            : null;
    const stationLon =
        nodeLocation.location.lon !== "FIXME"
            ? nodeLocation.location.lon
            : null;
    const hasLocation = stationLat && !isCommunityLocation;

    const [editting, setEditting] = useState(false);
    const [nodeMarker, setNodeMarker] = useState<LatLngExpression>(null);

    const mapRef = useRef<L.Map | null>();

    // Set map position when map is available or location gets updated
    useEffect(() => {
        function updateNodeMarker(lat, lon) {
            setNodeMarker([lat, lon]);
        }
        const mapInstance = mapRef.current;

        if (!loading && mapInstance && stationLat) {
            mapInstance.setView([+stationLat, +stationLon], 13);
            updateNodeMarker(stationLat, stationLon);
        }
    }, [stationLat, stationLon, loading]);

    // Center the map on the node also when editting is turned on
    useEffect(() => {
        const map = mapRef.current;
        if (map && stationLat) {
            editting && map.setView([+stationLat, +stationLon], 13);
        }
    }, [mapRef, editting, stationLat, stationLon]);

    function onConfirmLocation() {
        const position = mapRef.current.getCenter();
        changeLocation({ lat: position.lat, lon: position.lng });
    }

    function isReady() {
        return !loading && typeof stationLat !== "undefined";
    }

    function toogleEdition() {
        setEditting(!editting);
    }

    if (isAssetError) {
        return (
            <div id="map-container" className={style.hasAssetError}>
                <Trans>Cannot load map, check your internet connection</Trans>
            </div>
        );
    }

    return (
        <>
            {(!isReady() || submitting) && (
                <div id="loading-container" className={style.loadingContainer}>
                    <Loading />
                </div>
            )}
            {isReady() && (
                <MapContainer
                    center={[-30, -60]}
                    zoom={3}
                    scrollWheelZoom={true}
                    className={style.mapContainer}
                    ref={mapRef}
                >
                    <LayersControl position="bottomright">
                        <LayersControl.BaseLayer checked name="Open Street Map">
                            <TileLayer
                                attribution={openStreetMapAttribution}
                                url={openStreetMapTileString}
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Google Maps Satellite">
                            <TileLayer
                                url={gmSatellite}
                                subdomains={gmSubdomains}
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Google Maps Hybrid">
                            <TileLayer
                                url={gmHybrid}
                                subdomains={gmSubdomains}
                            />
                        </LayersControl.BaseLayer>
                    </LayersControl>
                    {nodeMarker && (
                        <Marker
                            position={nodeMarker}
                            icon={icon({ ...homeIcon })}
                        />
                    )}
                    {editting && (
                        <div
                            id="location-marker"
                            className={style.locationMarker}
                        />
                    )}
                </MapContainer>
            )}
            {isReady() && (
                <div id="edit-action" className={style.editAction}>
                    {editting && (
                        <button onClick={onConfirmLocation}>
                            <Trans>confirm location</Trans>
                        </button>
                    )}
                    <button onClick={toogleEdition}>
                        {editting && <Trans>cancel</Trans>}
                        {!editting && hasLocation && (
                            <Trans>edit location</Trans>
                        )}
                        {!editting && !hasLocation && (
                            <Trans>locate my node</Trans>
                        )}
                    </button>
                </div>
            )}
        </>
    );
};

export default LocatePage;
