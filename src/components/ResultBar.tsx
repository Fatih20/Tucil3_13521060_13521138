import { useLocationAndRouteContext } from "./AppCore";

export default function ResultBar({
  pathSequence = [],
}: {
  pathSequence: number[];
}) {
  const { getMarkerAt } = useLocationAndRouteContext();

  function pathMaker() {
    if (pathSequence.length <= 0) {
      return;
    }

    if (pathSequence[0] === -1) {
      return "No Path Found";
    }

    return pathSequence
      .map((index) => getMarkerAt(index).getName())
      .join(" → ");
  }
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-base text-black w-full ${
        pathSequence.length === 0 ? "hidden" : ""
      }`}
    >
      <h2 className="text-lg font-bold">Found Path</h2>
      <p>{pathMaker()}</p>
    </div>
  );
}
