import { useState } from "react";
import { LatLng } from "./types";

export function useLocationMarker(initialValues: LatLng[]) {
  const [locationMarkers, setLocationMarkers] = useState(initialValues);

  function addLocationMarker(addedMarker: LatLng) {
    console.log("Marker to add", addedMarker);
    setLocationMarkers([...locationMarkers, addedMarker]);
  }

  function addLocationMarkers(addedMarkers: LatLng[]) {
    setLocationMarkers([...locationMarkers, ...addedMarkers]);
  }

  function removeLocationMarker(index: number) {
    if (index < 0) {
      return;
    }
    setLocationMarkers([...locationMarkers.splice(index, 1)]);
  }

  function getMarkerAt(index: number): LatLng {
    return locationMarkers[index];
  }

  function isMarkerInHere(detectedMarker: LatLng) {
    return !locationMarkers.every(
      (marker) =>
        marker[0] != detectedMarker[0] && marker[1] != detectedMarker[1]
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
