import L, { LatLng } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocationAndRouteContext } from "@/components/AppCore";
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
            position={new LatLng(marker.getLat(), marker.getLng())}
            key={`${marker.getLat()} ${marker.getLng()}`}
          >
            <Popup>
              <p className="text-base font-black text-center">{index}</p>
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
