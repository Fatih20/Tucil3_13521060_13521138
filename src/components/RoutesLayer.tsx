import { Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  LocationAndRouteContext,
  useLocationAndRouteContext,
} from "@/components/AppCore";

export default function RoutesLayer({}: {}) {
  const { getMarkerAt, routes, removeRoute } = useLocationAndRouteContext();
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
            key={`${getMarkerAt(route.getSource()).getName()} ${getMarkerAt(
              route.getDestination()
            ).getName()}`}
          >
            <Popup>
              <div className="flex flex-col items-center justify-start">
                <p
                  className={`text-black text-base text-center ${
                    route.isTwoWay() ? "hidden" : ""
                  }`}
                >
                  {`(${getMarkerAt(
                    route.getSource()
                  ).getName()} to ${getMarkerAt(
                    route.getDestination()
                  ).getName()})`}
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
