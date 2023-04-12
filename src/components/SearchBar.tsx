import { useState } from "react";
import {
  LocationAndRouteContext,
  useLocationAndRouteContext,
  useSolutionContext,
} from "./AppCore";
import Image from "next/image";

export default function SearchBar() {
  const {
    locationMarkers,
    getMarkerAt,
    getLocationAsNodeList,
    getRouteMatrix,
  } = useLocationAndRouteContext();
  const {
    setSourceMarkerIndex,
    setDestinationMarkerIndex,
    sourceMarkerIndex,
    destinationMarkerIndex,
    isSourceAndDestinationSame,
    search,
  } = useSolutionContext();
  const [firstToSecond, setFirstToSecond] = useState(true);
  const [searchMethod, setSearchMethod] = useState("ucs");
  function handleSubmit() {
    search(getLocationAsNodeList(), getRouteMatrix(), searchMethod !== "ucs");
  }

  return (
    <form
      className={`flex flex-col items-center justify-center w-fit gap-2 ${
        locationMarkers.length <= 1 ? "hidden" : ""
      }`}
      onSubmit={(e) => handleSubmit}
    >
      <h2 className="text-lg font-bold text-black text-center self-center w-full">
        Search For a Path
      </h2>
      <div className="flex flex-row items-center justify-center gap-2">
        <select
          className="select select-bordered w-fit select-sm"
          value={sourceMarkerIndex === -1 ? "Start Node" : sourceMarkerIndex}
          onChange={(e) => setSourceMarkerIndex(Number(e.target.value))}
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
          value={
            destinationMarkerIndex === -1
              ? "Destination Node"
              : destinationMarkerIndex ?? 0
          }
          onChange={(e) => setDestinationMarkerIndex(Number(e.target.value))}
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
            isSourceAndDestinationSame() ? "btn-disabled" : ""
          }`}
          type="submit"
          disabled={isSourceAndDestinationSame()}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Search
        </button>
        <div className="flex flex-row items-end justify-center">
          <label className="label cursor-pointer text-black flex flex-row items-center justify-center gap-2">
            UCS
            <input
              type="radio"
              name="topping"
              value={"ucs"}
              className="radio radio-sm"
              checked={searchMethod === "ucs"}
              onChange={(e) => setSearchMethod(e.target.value)}
            />
          </label>
          <label className="label cursor-pointer text-black flex flex-row items-center justify-center gap-2">
            A*
            <input
              type="radio"
              name="topping"
              value={"a*"}
              className="radio radio-sm"
              checked={searchMethod === "a*"}
              onChange={(e) => setSearchMethod(e.target.value)}
            />
          </label>
        </div>
      </div>
    </form>
  );
}
