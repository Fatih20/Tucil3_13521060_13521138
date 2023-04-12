import { useLocationAndRouteContext } from "./AppCore";

export default function ResultBar({
  pathSequence = [],
}: {
  pathSequence?: number[];
}) {
  const { getMarkerAt } = useLocationAndRouteContext();
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-base text-black w-fit ${
        pathSequence.length === 0 ? "hidden" : ""
      }`}
    >
      <h2 className="text-lg font-bold">Found Path</h2>
      <p>
        {pathSequence?.map((index) => getMarkerAt(index).getName()).join(" → ")}
      </p>
    </div>
  );
}
