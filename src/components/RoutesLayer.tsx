import { Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocationAndRouteContext } from "@/pages";
import { useContext } from "react";

export default function RoutesLayer({}: {}) {
  const { getMarkerAt, routes, removeRoute } = useContext(
    LocationAndRouteContext
  );
  return (
    <>
      {routes.map(({ destination, source, weight }, index) => {
        const markerSource = getMarkerAt(source);
        const markerDestination = getMarkerAt(destination);

        return (
          <Polyline
            positions={[
              [markerSource.lat, markerSource.lng],
              [markerDestination.lat, markerDestination.lng],
            ]}
            key={`${source} ${destination}`}
          >
            <Popup>
              {weight}
              <button
                className="btn btn-primary"
                onClick={() => {
                  removeRoute(index);
                }}
              >
                Delete
              </button>
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}
