import { useContext, useState } from "react";
import { LocationAndRouteContext } from "./AppCore";
import Image from "next/image";

export default function SearchBar() {
  const { locationMarkers, getMarkerAt } = useContext(LocationAndRouteContext);
  const [sourceNodeIndex, setSourceNodeIndex] = useState(0);
  const [destinationNodeIndex, setDestinationNodeIndex] = useState(0);
  const [firstToSecond, setFirstToSecond] = useState(true);

  const [searchMethod, setSearchMethod] = useState("ucs");

  function handleSubmit() {}

  return (
    <form
      className={`flex flex-row items-center justify-center w-fit gap-2 ${
        locationMarkers.length === 0 ? "hidden" : ""
      }`}
      onSubmit={(e) => handleSubmit}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <select
          className="select select-bordered w-fit"
          value={sourceNodeIndex}
          onChange={(e) => setSourceNodeIndex(Number(e.target.value))}
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
          value={destinationNodeIndex}
          onChange={(e) => setDestinationNodeIndex(Number(e.target.value))}
          className="select select-bordered w-fit"
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
      <div className="flex flex-grow flex-col items-center justify-center">
        <button
          className={`btn btn-sm ${
            sourceNodeIndex === destinationNodeIndex ? "btn-disabled" : ""
          }`}
          type="submit"
          disabled={sourceNodeIndex === destinationNodeIndex}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Search
        </button>
        <div className="flex flex-col items-end justify-center">
          <label className="label cursor-pointer text-black flex flex-row items-center justify-center gap-2">
            UCS
            <input
              type="radio"
              name="topping"
              value={"ucs"}
              className="radio"
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
              className="radio"
              checked={searchMethod === "a*"}
              onChange={(e) => setSearchMethod(e.target.value)}
            />
          </label>
        </div>
      </div>
    </form>
  );
}
