import { RouteContext, LocationMarkerContext } from "@/pages";
import { useContext } from "react";

export default function NewPathForm() {
  const { locationMarkers } = useContext(LocationMarkerContext);
  const { addRoute, routes } = useContext(RouteContext);
  return <form onSubmit={() => {}}></form>;
}
