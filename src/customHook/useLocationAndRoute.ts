import { useState } from "react";
import { LatLng } from "leaflet";
import { MapNode } from "@/mapNode";
import { Route, LocationMarker } from "@/types";

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

  function getRouteMatrix(): (string | number)[][] {
    const numberOfMarker = locationMarkers.length;
    const matrix = new Array(numberOfMarker)
      .fill(undefined)
      .map(() => Array(numberOfMarker).fill("-"));

    routes.forEach((route) => {
      matrix[route.getSource()][route.getDestination()] = route.getWeight();
      if (route.isTwoWay()) {
        matrix[route.getDestination()][route.getSource()] = route.getWeight();
      }
    });
    return matrix;
  }

  function getLocationAsNodeList(): MapNode[] {
    return locationMarkers.map((markers) => {
      return new MapNode(markers.getName(), markers.lat, markers.lng);
    });
  }

  function resetPath() {
    setRoutes([
      ...routes.map((route) => {
        return route;
      }),
    ]);
  }

  function parseFile(fileLines: string[]): boolean {
    const nNodes = Number(fileLines[0].split(" ")[0]);

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

    for (let secondI = nNodes + 1; secondI < nNodes * 2 + 1; secondI++) {
      let trueIndex = secondI - nNodes - 1;
      let lineRead = fileLines[secondI].split(" ");

      if (lineRead.length != nNodes) return false;

      for (let j = trueIndex; j < nNodes; j++) {
        const weight1 = parseFloat(fileLines[secondI].split(" ")[j]);
        const weight2 = parseFloat(
          fileLines[j + nNodes + 1].split(" ")[trueIndex]
        );

        // Jika kedua nilai bukan angka, lewati loop
        if (isNaN(weight1) && isNaN(weight2)) continue;

        // Jika salah satu dan hanya satu dari weight1 atau weight 2 adalah angka, maka buatlah satu saja addedRoute yang tidak TwoWay
        if (isNaN(weight1) != isNaN(weight2)) {
          let addedRoute: Route;
          if (!isNaN(weight1)) {
            addedRoute = new Route(trueIndex, j, weight1);
          } else {
            addedRoute = new Route(j, trueIndex, weight2);
          }
          routes.push(addedRoute);
        } else {
          // Jika weight bernilai sama, maka tambahkan sebuah rute two way
          if (weight1 === weight2) {
            const addedRoute = new Route(trueIndex, j, weight1);
            addedRoute.makeTwoWay();
            routes.push(addedRoute);
          }
          // Jika weight tidak sama, maka tambahkan dua rute one way
          else {
            const addedRoute1 = new Route(trueIndex, j, weight1);
            const addedRoute2 = new Route(j, trueIndex, weight2);
            routes.push(addedRoute1);
            routes.push(addedRoute2);
          }
        }
      }
    }

    setLocationMarkers([...markers]);
    setRoutes([...routes]);
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
