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
            pathOptions={{ color: route.isTwoWay() ? "#DA70D6" : "#87CEFA" }}
            positions={[
              [markerSource.lat, markerSource.lng],
              [markerDestination.lat, markerDestination.lng],
            ]}
            key={`${route.getSource()} ${route.getDestination()}`}
          >
            <Popup>
              <div className="flex flex-col items-center justify-start">
                <p
                  className={`text-black text-base text-center ${
                    route.isTwoWay() ? "hidden" : ""
                  }`}
                >
                  {`(${route.getSource()} to ${route.getDestination()})`}
                </p>
                <p className="text-black text-base">{route.getWeight()}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    removeRoute(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}
