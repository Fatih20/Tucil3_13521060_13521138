import { useState } from "react";
import { Route } from "../types";

export type UseRouteHook = {
  routes: Route[];
  addRoute: (source: number, destination: number, weight: number) => void;
  addRoutes: (addedRoute: Route[]) => void;
  resetRoutes: () => void;
  removeRouteWithNodeIndex: (index: number) => void;
  removeRoute: (index: number) => void;
};

export default function useRoute(initialValues: Route[]) {
  const [routes, setRoutes] = useState(initialValues);

  function addRoute(source: number, destination: number, weight: number) {
    const addedRoute: Route = { source, destination, weight };
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
        (route) => route.source != index && route.source != index
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
    routes,
    addRoute,
    addRoutes,
    resetRoutes,
    removeRouteWithNodeIndex,
    removeRoute,
  };
}
