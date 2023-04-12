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
import HoverContainer from "./HoverContainer";

export const LocationAndRouteContext = createContext<UseLocationAndRouteHook>(
  {} as UseLocationAndRouteHook
);

export default function AppCore() {
  const locationAndRouteHook = useLocationAndRoute([], []);
  const [open, setOpen] = useState(false);
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
            <div className="flex flex-row items-start justify-start gap-4 h-fit">
              <HoverContainer placeholder="File Input">
                <FileInput />
              </HoverContainer>
              <HoverContainer
                show={locationAndRouteHook.locationMarkers.length > 1}
                placeholder="Add Route"
              >
                <NewPathForm />
              </HoverContainer>
              <HoverContainer
                show={locationAndRouteHook.locationMarkers.length > 1}
                placeholder="Search for A Path"
              >
                <SearchBar />
              </HoverContainer>
              <HoverContainer placeholder="Search Result">
                <ResultBar />
              </HoverContainer>
            </div>
          </div>
          <MapComponent />
        </main>
      </LocationAndRouteContext.Provider>
    </>
  );
}
