import { LocationAndRouteContext } from "@/pages";
import { useContext, useState } from "react";
import Image from "next/image";

export default function NewPathForm() {
  const { locationMarkers, addRoute, routes } = useContext(
    LocationAndRouteContext
  );
  const [selectedFirstNode, setSelectedFirstNode] = useState(0);
  const [selectedSecondNode, setSelectedSecondNode] = useState(0);
  const [firstToSecond, setFirstToSecond] = useState(true);
  const [isTwoWay, setIsTwoWay] = useState(false);

  function handleSubmit() {
    // console.log("Selecteds", selectedFirstNode, selectedSecondNode);
    if (firstToSecond) {
      addRoute(selectedFirstNode, selectedSecondNode, isTwoWay);
    } else {
      addRoute(selectedSecondNode, selectedFirstNode, isTwoWay);
    }
  }

  return (
    <form
      className={`flex flex-row items-center justify-center w-fit gap-2 ${
        locationMarkers.length === 0 ? "hidden" : ""
      }`}
      onSubmit={(e) => handleSubmit}
    >
      <select
        className="select select-bordered w-fit"
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
      <button
        className=""
        onClick={() => setFirstToSecond((prev) => !prev)}
        type="button"
      >
        <Image
          src="/arrow.svg"
          alt="Arrow from to node"
          className={`transition-transform ${
            firstToSecond ? "" : "rotate-180"
          }`}
          width={30}
          height={20}
        />
      </button>
      <select
        value={selectedSecondNode}
        onChange={(e) => setSelectedSecondNode(Number(e.target.value))}
        className="select select-bordered w-fit"
      >
        {locationMarkers.map((_, index) => {
          return (
            <option key={index} value={index}>
              {index}
            </option>
          );
        })}
      </select>
      <div className="flex flex-grow flex-col items-center justify-center">
        <button
          className={`btn btn-sm ${
            selectedFirstNode === selectedSecondNode ? "btn-disabled" : ""
          }`}
          type="submit"
          disabled={selectedFirstNode === selectedSecondNode}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Add Routes
        </button>
        <label className="label label-text flex flex-row items-center justify-center gap-2 text-black">
          <input
            disabled={selectedFirstNode === selectedSecondNode}
            className="checkbox checkbox-sm"
            type="checkbox"
            checked={isTwoWay}
            onChange={(e) => setIsTwoWay(e.target.checked)}
          />
          Two Way
        </label>
      </div>
    </form>
  );
}
