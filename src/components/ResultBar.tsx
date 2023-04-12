export default function ResultBar({
  pathSequence = [],
}: {
  pathSequence?: number[];
}) {
  const pathText = pathSequence?.join(" → ");
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-base text-black w-full ${
        pathSequence.length === 0 ? "hidden" : ""
      }`}
    >
      <h2 className="text-lg font-bold">Found Path</h2>
      <p>{pathText}</p>
    </div>
  );
}
