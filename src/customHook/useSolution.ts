import { MapNode } from "@/mapNode";
import { AdjacencyList } from "@/searchMap";
import { Route } from "@/types";
import { useEffect, useMemo, useState } from "react";

export type UseSolution = {
  sourceMarkerIndex: number;
  setSourceMarkerIndex: (arg0: number) => void;
  destinationMarkerIndex: number;
  setDestinationMarkerIndex: (arg0: number) => void;
  isSourceIndex: (arg0: number) => boolean;
  isDestinationIndex: (arg0: number) => boolean;
  pathSequence: number[];
  search: (
    nodes: MapNode[],
    graph: (number | string)[][],
    isAStar: boolean
  ) => void;
  resetPathSequence: () => void;
  resetSourceAndDest: () => void;
  isSourceAndDestinationSame: () => boolean;
  pathRoutesTuple: [number, number][];
};

export function useSolution() {
  const [sourceMarkerIndex, setSourceMarkerIndex] = useState(-1);
  const [destinationMarkerIndex, setDestinationMarkerIndex] = useState(-1);

  const [pathSequence, setPathSequence] = useState([] as number[]);
  const pathRoutesTuple = useMemo(
    () => AdjacencyList.computeEdges(pathSequence),
    [pathSequence]
  );

  useEffect(() => {
    // console.log(pathSequence);
  }, [pathSequence]);

  function isSourceIndex(index: number) {
    return index === sourceMarkerIndex;
  }

  function isDestinationIndex(index: number) {
    return index === destinationMarkerIndex;
  }

  function search(
    nodes: MapNode[],
    graph: (number | string)[][],
    isAStar: boolean
  ) {
    const aL = new AdjacencyList(nodes, graph);
    if (sourceMarkerIndex === -1 || destinationMarkerIndex === -1) {
      return;
    }
    try {
      if (isAStar) {
        setPathSequence([
          ...aL.AStar(sourceMarkerIndex, destinationMarkerIndex),
        ]);
      } else {
        setPathSequence([...aL.UCS(sourceMarkerIndex, destinationMarkerIndex)]);
      }
    } catch (e) {
      setPathSequence([-1]);
    }
  }

  function resetPathSequence() {
    setPathSequence([]);
  }

  function resetSourceAndDest() {
    setSourceMarkerIndex(-1);
    setDestinationMarkerIndex(-1);
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
