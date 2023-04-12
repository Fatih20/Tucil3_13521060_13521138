export default function ResultBar({
  pathSequence = [],
}: {
  pathSequence?: number[];
}) {
  const pathText = pathSequence?.join(" → ");
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-base text-black ${
        pathSequence.length === 0 ? "hidden" : ""
      }`}
    >
      <p className="text-lg font-bold">Found Path</p>
      <p>{pathText}</p>
    </div>
  );
}
