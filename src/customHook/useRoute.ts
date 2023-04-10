import { useState } from "react";
import { Route } from "../types";

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

  function resetRoutes() {
    setRoutes([]);
  }

  return {
    routes,
    addRoute,
    addRoutes,
    resetRoutes,
    removeRouteWithNodeIndex,
  };
}
