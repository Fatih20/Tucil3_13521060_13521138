import { useState } from "react";
import { LatLng } from "leaflet";
import { Route } from "@/types";
export type UseLocationAndRouteHook = {
  locationMarkers: LatLng[];
  addLocationMarker: (arg0: LatLng) => void;
  addLocationMarkers: (arg1: LatLng[]) => void;
  removeLocationMarker: (index: number) => void;
  getMarkerAt: (index: number) => LatLng;
  isMarkerInHere: (arg0: LatLng) => boolean;
  resetMarker: () => void;
  routes: Route[];
  addRoute: (source: number, destination: number) => void;
  addRoutes: (addedRoute: Route[]) => void;
  resetRoutes: () => void;
  removeRouteWithNodeIndex: (index: number) => void;
  removeRoute: (index: number) => void;
};

export function useLocationAndRoute(
  initialLocations: LatLng[],
  initialRoutes: Route[]
) {
  const [locationMarkers, setLocationMarkers] = useState(initialLocations);
  const [routes, setRoutes] = useState(initialRoutes);

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
    return !locationMarkers.every((marker) => !marker.equals(detectedMarker));
  }

  function resetMarker() {
    setLocationMarkers([]);
  }

  function addRoute(source: number, destination: number) {
    const weight = getMarkerAt(source).distanceTo(getMarkerAt(destination));
    const addedRoute: Route = { source, destination, weight };

    // Prevent adding route to itself
    if (source === destination) {
      return;
    }

    // Prevent adding existing routes
    if (
      routes.some(
        (route) => route.source == source && route.destination == destination
      )
    ) {
      return;
    }

    setRoutes([...routes, addedRoute]);
  }

  function addRoutes(addedRoute: Route[]) {
    setRoutes([...routes, ...addedRoute]);
  }

  function removeRouteWithNodeIndex(index: number) {
    if (index < 0) {
      return;
    }
    setRoutes([
      ...routes.filter(
        (route) => route.source != index && route.destination != index
      ),
    ]);
  }

  function removeRoute(index: number) {
    if (index < 0) {
      return;
    }
    setRoutes(routes.filter((_, i) => i != index));
  }

  function resetRoutes() {
    setRoutes([]);
  }

  return {
    locationMarkers,
    addLocationMarker,
    addLocationMarkers,
    removeLocationMarker,
    getMarkerAt,
    isMarkerInHere,
    resetMarker,
    routes,
    addRoute,
    addRoutes,
    resetRoutes,
    removeRouteWithNodeIndex,
    removeRoute,
  } as UseLocationAndRouteHook;
}
