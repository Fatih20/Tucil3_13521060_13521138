import { Route } from "@/types";
import { useState } from "react";

export type UseSolution = {
  sourceMarkerIndex: number | null;
  setSourceMarkerIndex: (arg0: number) => void;
  destinationMarkerIndex: number | null;
  setDestinationMarkerIndex: (arg0: number) => void;
  isSourceIndex: (arg0: number) => boolean;
  isDestinationIndex: (arg0: number) => boolean;
  pathSequence: number[];
  search: (arg0: Route[]) => void;
  resetPathSequence: () => void;
  resetSourceAndDest: () => void;
};

export function useSolution() {
  const [sourceMarkerIndex, setSourceMarkerIndex] = useState(
    null as null | number
  );
  const [destinationMarkerIndex, setDestinationMarkerIndex] = useState(
    null as null | number
  );

  const [pathSequence, setPathSequence] = useState([] as number[]);

  function isSourceIndex(index: number) {
    return index === sourceMarkerIndex;
  }

  function isDestinationIndex(index: number) {
    return index === destinationMarkerIndex;
  }

  function search(routes: Route[]) {}

  function resetPathSequence() {
    setPathSequence([]);
  }

  function resetSourceAndDest() {
    setSourceMarkerIndex(null);
    setDestinationMarkerIndex(null);
  }

  return {
    sourceMarkerIndex,
    setSourceMarkerIndex,
    destinationMarkerIndex,
    setDestinationMarkerIndex,
    isSourceIndex,
    isDestinationIndex,
    pathSequence,
    search,
    resetPathSequence,
    resetSourceAndDest,
  };
}
