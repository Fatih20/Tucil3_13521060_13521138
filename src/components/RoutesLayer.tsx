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
      {routes.map((route, index) => {
        const markerSource = getMarkerAt(route.getSource());
        const markerDestination = getMarkerAt(route.getDestination());

        return (
          <Polyline
            positions={[
              [markerSource.lat, markerSource.lng],
              [markerDestination.lat, markerDestination.lng],
            ]}
            key={`${route.getSource()} ${route.getDestination()}`}
          >
            <Popup>
              {route.getWeight()}
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
