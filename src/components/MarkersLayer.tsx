import L, { LatLng } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocationAndRouteContext } from "@/components/AppCore";
import { useContext } from "react";
import { LocationMarker } from "@/types";

export default function MarkersLayer({}: {}) {
  const {
    addLocationMarker,
    locationMarkers,
    removeLocationMarker,
    removeRouteWithNodeIndex,
  } = useContext(LocationAndRouteContext);
  const mapEvent = useMapEvents({
    click({ latlng }) {
      addLocationMarker(
        new LocationMarker(latlng, locationMarkers.length.toString())
      );
    },
  });

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
