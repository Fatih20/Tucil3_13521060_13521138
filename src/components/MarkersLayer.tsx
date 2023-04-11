import { LatLng } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "./Button";
import { LocationMarkerContext } from "@/pages";
import { useContext } from "react";

export default function MarkersLayer({}: {}) {
  const { addLocationMarker, locationMarkers, removeLocationMarker } =
    useContext(LocationMarkerContext);
  const mapEvent = useMapEvents({
    click({ latlng }) {
      addLocationMarker(latlng);
    },
  });
  return (
    <>
      {locationMarkers.map((marker, index) => {
        return (
          <Marker position={marker} key={`${marker.lat} ${marker.lng}`}>
            <Popup>
              <Button small={true} onClick={() => removeLocationMarker(index)}>
                Delete
              </Button>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
