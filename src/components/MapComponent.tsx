import L, { LatLng } from "leaflet";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkersLayer from "./MarkersLayer";

export default function MapComponent({
  addLocationMarker,
  locationMarkers,
  removeLocationMarker,
}: {
  addLocationMarker: (latLng: LatLng) => void;
  locationMarkers: LatLng[];
  removeLocationMarker: (index: number) => void;
}) {
  const position = new LatLng(-6.922, 107.609);
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkersLayer
        removeLocationMarker={removeLocationMarker}
        locationMarkers={locationMarkers}
        addLocationMarker={addLocationMarker}
      />
    </MapContainer>
  );
}
