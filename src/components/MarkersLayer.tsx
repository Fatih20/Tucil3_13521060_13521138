import L, { LatLng } from "leaflet";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  LocationAndRouteContext,
  useLocationAndRouteContext,
} from "@/components/AppCore";
import { useEffect } from "react";
import { LocationMarker } from "@/types";

export default function MarkersLayer({}: {}) {
  const {
    addLocationMarker,
    locationMarkers,
    removeLocationMarker,
    removeRouteWithNodeIndex,
  } = useLocationAndRouteContext();
  const mapEvent = useMapEvents({
    click({ latlng }) {
      addLocationMarker(
        new LocationMarker(latlng, locationMarkers.length.toString())
      );
    },
  });

  const map = useMap();

  useEffect(() => {
    if (locationMarkers.length > 1) {
      map.fitBounds(
        locationMarkers.map((lm) => {
          return [lm.lat, lm.lng];
        })
      );
    }
  }, [locationMarkers, map]);

  const customIcon = new L.Icon({
    iconUrl: "/locationIcon.svg",
    iconSize: [32, 40],
  });
  return (
    <>
      {locationMarkers.map((marker, index) => {
        return (
          <Marker
            icon={customIcon}
            position={new LatLng(marker.lat, marker.lng)}
            key={`${marker.lat} ${marker.lng}`}
          >
            <Popup>
              <p className="text-base font-black text-center">
                {marker.getName()}
              </p>
              <button
                className="btn btn-xs"
                onClick={() => {
                  removeRouteWithNodeIndex(index);
                  removeLocationMarker(index);
                }}
              >
                Delete
              </button>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
