import { useState } from "react";
import { LatLng } from "leaflet";

export function useLocationMarker(initialValues: LatLng[]) {
  const [locationMarkers, setLocationMarkers] = useState(initialValues);

  function addLocationMarker(addedMarker: LatLng) {
    setLocationMarkers([...locationMarkers, addedMarker]);
  }

  function addLocationMarkers(addedMarkers: LatLng[]) {
    setLocationMarkers([...locationMarkers, ...addedMarkers]);
  }

  function removeLocationMarker(index: number) {
    if (index < 0) {
      return;
    }
    setLocationMarkers(locationMarkers.filter((_, i) => i != index));
  }

  function getMarkerAt(index: number): LatLng {
    return locationMarkers[index];
  }

  function isMarkerInHere(detectedMarker: LatLng) {
    return !locationMarkers.every(
      (marker) =>
        marker.lat != detectedMarker.lat && marker.lng != detectedMarker.lng
    );
  }

  function resetMarker() {
    setLocationMarkers([]);
  }

  return {
    locationMarkers,
    addLocationMarker,
    addLocationMarkers,
    removeLocationMarker,
    getMarkerAt,
    isMarkerInHere,
    resetMarker,
  };
}
