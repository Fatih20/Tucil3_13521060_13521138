import Image from "next/image";
import { Inter } from "next/font/google";
import {
  UseLocationAndRouteHook,
  useLocationAndRoute,
} from "@/customHook/useLocationAndRoute";
import useWindowDimensions from "@/customHook/useWindowDimension";
import dynamic from "next/dynamic";
import { createContext, useState } from "react";
import NewPathForm from "@/components/NewPathForm";
import FileInput from "@/components/FileInput";
import SearchBar from "./SearchBar";
import ResultBar from "./ResultBar";

export const LocationAndRouteContext = createContext<UseLocationAndRouteHook>(
  {} as UseLocationAndRouteHook
);

export default function AppCore() {
  const locationAndRouteHook = useLocationAndRoute([], []);
  const [open, setOpen] = useState(false)
  const { width, height } = useWindowDimensions();

  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
    loading: () => <p>Loading the map</p>,
  });

  return (
    <>
      <LocationAndRouteContext.Provider value={locationAndRouteHook}>
        <main className="flex h-screen flex-col items-center justify-between w-screen relative">
          <div className="absolute bg-transparent inset-0 w-full flex flex-col items-start justify-end z-[100] pointer-events-none box-border p-2">
            <div className="flex flex-col items-center justify-center gap-4 pointer-events-auto self-end">
              <button
                className="btn btn-sm pointer-events-auto shadow-lg shadow-black/50"
                onClick={locationAndRouteHook.resetMarker}
              >
                Reset Marker
              </button>
              <button
                className="btn btn-sm pointer-events-auto shadow-lg shadow-black/50"
                onClick={locationAndRouteHook.resetRoutes}
              >
                Reset Routes
              </button>
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row items-start justify-start w-full pointer-events-auto gap-4 bg-white box-border rounded-md p-4 shadow-lg shadow-black/50 mb-5">
              <FileInput />
              <NewPathForm />
              <SearchBar />
              <ResultBar pathSequence={[1, 2, 3, 4, 5]} />
            </div>
          </div>
          <MapComponent />
        </main>
      </LocationAndRouteContext.Provider>
    </>
  );
}
