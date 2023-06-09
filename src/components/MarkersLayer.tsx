import { LatLng } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  useLocationAndRouteContext,
  useSolutionContext,
} from "@/components/AppCore";
import { LocationMarker } from "@/types";

export default function MarkersLayer({}: {}) {
  const {
    addLocationMarker,
    locationMarkers,
    removeLocationMarker,
    removeRouteWithNodeIndex,
  } = useLocationAndRouteContext();
  const { resetPathSequence } = useSolutionContext();
  const { isDestinationIndex, isSourceIndex } = useSolutionContext();
  const mapEvent = useMapEvents({
    click({ latlng }) {
      addLocationMarker(
        new LocationMarker(latlng, locationMarkers.length.toString())
      );
      resetPathSequence();
    },
  });

  const iconMaker = (marker: LocationMarker, index: number) => {
    if (isDestinationIndex(index)) {
      return marker.getDestinationIcon();
    }
    if (isSourceIndex(index)) {
      return marker.getSourceIcon();
    }

    return marker.getRegularIcon();
  };

  return (
    <>
      {locationMarkers.map((marker, index) => {
        return (
          <Marker
            icon={iconMaker(marker, index)}
            position={new LatLng(marker.lat, marker.lng)}
            key={`${marker.lat} ${marker.lng}`}
          >
            <Popup>
              <p className="text-base font-black text-center">
                {marker.getName()}
              </p>
              <button
                className="btn btn-xs"
                onClick={(e) => {
                  e.stopPropagation();
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
