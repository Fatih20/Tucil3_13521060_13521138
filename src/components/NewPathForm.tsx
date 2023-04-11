import { LocationAndRouteContext } from "@/pages";
import { useContext } from "react";

export default function NewPathForm() {
  const { locationMarkers, addRoute, routes } = useContext(
    LocationAndRouteContext
  );
  return <form onSubmit={() => {}}></form>;
}
