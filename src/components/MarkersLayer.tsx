import L, { LatLng } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocationAndRouteContext } from "@/pages";
import { useContext } from "react";

export default function MarkersLayer({}: {}) {
  const {
    addLocationMarker,
    locationMarkers,
    removeLocationMarker,
    removeRouteWithNodeIndex,
  } = useContext(LocationAndRouteContext);
  const mapEvent = useMapEvents({
    click({ latlng }) {
      addLocationMarker(latlng);
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
            position={marker}
            key={`${marker.lat} ${marker.lng}`}
          >
            <Popup>
              <button
                className="btn btn-primary"
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
