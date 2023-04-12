import {
  LocationAndRouteContext,
  useLocationAndRouteContext,
} from "@/components/AppCore";
import { useState } from "react";
import Image from "next/image";

export default function NewPathForm() {
  const { locationMarkers, addRoute, getMarkerAt } =
    useLocationAndRouteContext();
  const [selectedFirstNode, setSelectedFirstNode] = useState(0);
  const [selectedSecondNode, setSelectedSecondNode] = useState(0);
  const [firstToSecond, setFirstToSecond] = useState(true);
  const [isTwoWay, setIsTwoWay] = useState(false);

  function handleSubmit() {
    if (firstToSecond) {
      addRoute(selectedFirstNode, selectedSecondNode, isTwoWay);
    } else {
      addRoute(selectedSecondNode, selectedFirstNode, isTwoWay);
    }
  }

  return (
    <form
      className={`flex flex-col items-start justify-center w-fit gap-2 ${
        locationMarkers.length <= 1 ? "hidden" : ""
      }`}
      onSubmit={(e) => handleSubmit}
    >
      <h2 className="text-lg font-bold text-black text-center self-center">
        Add Routes
      </h2>
      <div className="flex flex-row items-center justify-center gap-2">
        <select
          className="select select-bordered w-fit select-sm"
          value={selectedFirstNode}
          onChange={(e) => setSelectedFirstNode(Number(e.target.value))}
        >
          {locationMarkers.map((_, index) => {
            return (
              <option key={index} value={index}>
                {getMarkerAt(index).getName()}
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
          className="select select-bordered w-fit select-sm"
        >
          {locationMarkers.map((_, index) => {
            return (
              <option key={index} value={index}>
                {getMarkerAt(index).getName()}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center w-full">
        <button
          className={`btn btn-sm w-full ${
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
