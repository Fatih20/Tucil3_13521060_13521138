import { LatLng } from "leaflet";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkersLayer from "./MarkersLayer";
import RoutesLayer from "./RoutesLayer";

export default function MapComponent({}: {}) {
  const position = new LatLng(-6.922, 107.609);
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutesLayer />
      <MarkersLayer />
    </MapContainer>
  );
}
