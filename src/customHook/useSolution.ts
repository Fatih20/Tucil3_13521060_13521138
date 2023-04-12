import { MapNode } from "@/mapNode";
import { AdjacencyList } from "@/searchMap";
import { Route } from "@/types";
import { useMemo, useState } from "react";

export type UseSolution = {
  sourceMarkerIndex: number | null;
  setSourceMarkerIndex: (arg0: number) => void;
  destinationMarkerIndex: number | null;
  setDestinationMarkerIndex: (arg0: number) => void;
  isSourceIndex: (arg0: number) => boolean;
  isDestinationIndex: (arg0: number) => boolean;
  pathSequence: number[];
  search: (nodes: MapNode[], graph: number[][], isAStar: boolean) => void;
  resetPathSequence: () => void;
  resetSourceAndDest: () => void;
  isSourceAndDestinationSame: () => boolean;
  pathRoutesTuple: [number, number][];
};

export function useSolution() {
  const [sourceMarkerIndex, setSourceMarkerIndex] = useState(
    null as null | number
  );
  const [destinationMarkerIndex, setDestinationMarkerIndex] = useState(
    null as null | number
  );

  const [pathSequence, setPathSequence] = useState([] as number[]);
  const pathRoutesTuple = useMemo(
    () => AdjacencyList.computeEdges(pathSequence),
    [pathSequence]
  );

  function isSourceIndex(index: number) {
    return index === sourceMarkerIndex;
  }

  function isDestinationIndex(index: number) {
    return index === destinationMarkerIndex;
  }

  function search(nodes: MapNode[], graph: number[][], isAStar: boolean) {
    const aL = new AdjacencyList(nodes, graph);
    if (sourceMarkerIndex === null || destinationMarkerIndex === null) {
      return;
    }
    if (isAStar) {
      setPathSequence(aL.AStar(sourceMarkerIndex, destinationMarkerIndex));
    } else {
      setPathSequence(aL.UCS(sourceMarkerIndex, destinationMarkerIndex));
    }
  }

  function resetPathSequence() {
    setPathSequence([]);
  }

  function resetSourceAndDest() {
    setSourceMarkerIndex(null);
    setDestinationMarkerIndex(null);
  }

  function isSourceAndDestinationSame() {
    return sourceMarkerIndex === destinationMarkerIndex;
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
    isSourceAndDestinationSame,
    pathRoutesTuple,
  };
}
