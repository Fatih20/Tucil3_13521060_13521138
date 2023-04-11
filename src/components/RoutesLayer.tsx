import { Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocationMarkerContext, RouteContext } from "@/pages";
import { useContext } from "react";

export default function RoutesLayer({}: {}) {
  const {
    addLocationMarker,
    locationMarkers,
    removeLocationMarker,
    getMarkerAt,
  } = useContext(LocationMarkerContext);
  const { routes, removeRouteWithNodeIndex, removeRoute } =
    useContext(RouteContext);
  return (
    <>
      {routes.map(({ destination, source, weight }, index) => {
        const markerSource = getMarkerAt(source - 1);
        const markerDestination = getMarkerAt(destination - 1);

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
