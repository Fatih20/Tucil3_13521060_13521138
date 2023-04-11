import { useState } from "react";
import { LatLng } from "leaflet";
import { Node, Route } from "@/types";
export type UseLocationAndRouteHook = {
  locationMarkers: LatLng[];
  addLocationMarker: (arg0: LatLng) => void;
  addLocationMarkers: (arg1: LatLng[]) => void;
  removeLocationMarker: (index: number) => void;
  getMarkerAt: (index: number) => LatLng;
  isMarkerInHere: (arg0: LatLng) => boolean;
  resetMarker: () => void;
  routes: Route[];
  addRoute: (source: number, destination: number, twoWay: boolean) => void;
  addRoutes: (addedRoute: Route[]) => void;
  resetRoutes: () => void;
  removeRouteWithNodeIndex: (index: number) => void;
  removeRoute: (index: number) => void;
  getRouteMatrix: () => (string | number)[][];
  getLocationAsNodeList: () => Node[];
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

  function addRoute(source: number, destination: number, isTwoWay: boolean) {
    const weight = getMarkerAt(source).distanceTo(getMarkerAt(destination));
    const addedRoute = new Route(source, destination, weight, isTwoWay);

    // Prevent adding route to itself
    if (source === destination) {
      return;
    }

    // Prevent adding existing routes
    if (routes.some((route) => route.isEqual(addedRoute))) {
      return;
    }

    // If one-way version already exists, remove the old one and add two way
    const indexOfEqualSD = routes.findIndex((route) =>
      addedRoute.isEqualSD(route)
    );

    if (indexOfEqualSD != -1) {
      addedRoute.makeTwoWay();
      removeRoute(indexOfEqualSD);
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
    setRoutes([...routes.filter((route) => !route.isContainNodeIndex(index))]);
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

  function getRouteMatrix() {
    const numberOfRoutes = routes.length;
    const matrix = new Array(numberOfRoutes).fill(
      new Array(numberOfRoutes).fill("-")
    );

    routes.forEach((route) => {
      matrix[route.getSource()][route.getDestination()] = route.getWeight();
      if (route.isTwoWay()) {
        matrix[route.getDestination()][route.getSource()] = route.getWeight();
      }
    });
    return matrix;
  }

  function getLocationAsNodeList(): Node[] {
    return locationMarkers.map((markers, index) => {
      return {
        name: index.toString(),
        latitude: markers.lat,
        longitude: markers.lng,
      };
    });
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
    getLocationAsNodeList,
  } as UseLocationAndRouteHook;
}
