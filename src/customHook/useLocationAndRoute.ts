import { useState } from "react";
import { LatLng } from "leaflet";
import { MapNode } from "@/mapNode";
import { Node, Route, LocationMarker } from "@/types";

export type UseLocationAndRouteHook = {
  locationMarkers: LocationMarker[];
  addLocationMarker: (arg0: LocationMarker) => void;
  addLocationMarkers: (arg1: LocationMarker[]) => void;
  removeLocationMarker: (index: number) => void;
  getMarkerAt: (index: number) => LocationMarker;
  isMarkerInHere: (arg0: LocationMarker) => boolean;
  resetMarker: () => void;
  routes: Route[];
  addRoute: (source: number, destination: number, twoWay: boolean) => void;
  addRoutes: (addedRoute: Route[]) => void;
  resetRoutes: () => void;
  removeRouteWithNodeIndex: (index: number) => void;
  removeRoute: (index: number) => void;
  getRouteMatrix: () => (string | number)[][];
  getLocationAsNodeList: () => MapNode[];
  resetPath: () => void;
  parseFile: (fileLines: string[]) => boolean;
};

export function useLocationAndRoute(
  initialLocations: LocationMarker[],
  initialRoutes: Route[]
) {
  const [locationMarkers, setLocationMarkers] = useState(initialLocations);
  const [routes, setRoutes] = useState(initialRoutes);

  function addLocationMarker(addedMarker: LocationMarker) {
    setLocationMarkers([...locationMarkers, addedMarker]);
  }

  function addLocationMarkers(addedMarkers: LocationMarker[]) {
    setLocationMarkers([...locationMarkers, ...addedMarkers]);
  }

  function removeLocationMarker(index: number) {
    if (index < 0) {
      return;
    }
    setLocationMarkers(locationMarkers.filter((_, i) => i != index));
  }

  function getMarkerAt(index: number): LocationMarker {
    return locationMarkers[index];
  }

  function isMarkerInHere(detectedMarker: LocationMarker) {
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
      routes[indexOfEqualSD].makeTwoWay();
      setRoutes([...routes]);
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

  function getLocationAsNodeList(): MapNode[] {
    return locationMarkers.map((markers, index) => {
      return new MapNode(index.toString(), markers.lat, markers.lng);
    });
  }

  function resetPath() {
    setRoutes([
      ...routes.map((route) => {
        route.makeNotPartOfPath();
        return route;
      }),
    ]);
  }

  function parseFile(fileLines: string[]): boolean {
    const nNodes = Number(fileLines[0]);

    let markers = [] as LocationMarker[];
    for (let i = 1; i < nNodes + 1; i++) {
      let lineRead = fileLines[i].split(" ");

      // Return false if the number of element is incorrect
      if (lineRead.length != 3) return false;

      let name = lineRead[0];
      let lat = parseFloat(lineRead[1]);
      let lon = parseFloat(lineRead[2]);

      // Return false if latitude or longitude isn't a number
      if (isNaN(lat) || isNaN(lon)) return false;

      markers.push(new LocationMarker(new LatLng(lat, lon), name));
    }

    let routes = [] as Route[];

    for (let i = nNodes; i < nNodes * 2; i++) {
      let trueIndex = i - nNodes;
      let lineRead = fileLines[i].split(" ");

      if (lineRead.length != nNodes) return false;

      for (let j = 0; j < nNodes; j++) {
        const weight = parseFloat(lineRead[j]);
        if (isNaN(weight)) continue;

        const addedRoute = new Route(trueIndex, j, parseFloat(lineRead[j]));

        routes.push(addedRoute);
      }
    }

    setLocationMarkers(markers);
    setRoutes(routes);
    return true;
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
    resetPath,
    getRouteMatrix,
    getLocationAsNodeList,
    parseFile,
  } as UseLocationAndRouteHook;
}
