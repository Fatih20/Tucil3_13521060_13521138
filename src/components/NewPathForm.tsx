import { LocationAndRouteContext } from "@/pages";
import { useContext, useState } from "react";

export default function NewPathForm() {
  const { locationMarkers, addRoute, routes } = useContext(
    LocationAndRouteContext
  );
  const [selectedFirstNode, setSelectedFirstNode] = useState(-1);
  const [selectedSecondNode, setSelectedSecondNode] = useState(-1);

  function handleSubmit() {
    // console.log("Selecteds", selectedFirstNode, selectedSecondNode);
    if (selectedFirstNode === -1 || selectedSecondNode === -1) {
      return;
    }
    addRoute(selectedFirstNode as number, selectedSecondNode as number);
  }

  return (
    <form
      className={`flex flex-row items-center justify-center w-full ${
        locationMarkers.length === 0 ? "hidden" : ""
      }`}
      onSubmit={(e) => handleSubmit}
    >
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedFirstNode}
        onChange={(e) => setSelectedFirstNode(Number(e.target.value))}
      >
        {locationMarkers.map((_, index) => {
          return (
            <option key={index} value={index}>
              {index}
            </option>
          );
        })}
      </select>
      <select
        value={selectedSecondNode}
        onChange={(e) => setSelectedSecondNode(Number(e.target.value))}
        className="select select-bordered w-full max-w-xs"
      >
        {locationMarkers.map((_, index) => {
          return (
            <option
              key={index}
              className={`${selectedFirstNode === index ? "hidden" : ""}`}
              value={index}
            >
              {index}
            </option>
          );
        })}
      </select>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Add Routes
      </button>
    </form>
  );
}
