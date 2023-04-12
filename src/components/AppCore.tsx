import Image from "next/image";
import { Inter } from "next/font/google";
import {
  UseLocationAndRouteHook,
  useLocationAndRoute,
} from "@/customHook/useLocationAndRoute";
import useWindowDimensions from "@/customHook/useWindowDimension";
import dynamic from "next/dynamic";
import { createContext, useContext, useState } from "react";
import NewPathForm from "@/components/NewPathForm";
import FileInput from "@/components/FileInput";
import SearchBar from "./SearchBar";
import ResultBar from "./ResultBar";
import { UseSolution, useSolution } from "@/customHook/useSolution";

export const LocationAndRouteContext = createContext<UseLocationAndRouteHook>(
  {} as UseLocationAndRouteHook
);

export const SolutionContext = createContext<UseSolution>({} as UseSolution);

export function useLocationAndRouteContext() {
  return useContext(LocationAndRouteContext);
}

export function useSolutionContext() {
  return useContext(SolutionContext);
}

export default function AppCore() {
  const locationAndRouteHook = useLocationAndRoute([], []);
  const solutionHook = useSolution();
  const { width, height } = useWindowDimensions();

  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
    loading: () => <p>Loading the map</p>,
  });

  return (
    <>
      <LocationAndRouteContext.Provider value={locationAndRouteHook}>
        <SolutionContext.Provider value={solutionHook}>
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
            </div>
            <MapComponent />
            <div className="flex flex-row items-start justify-start w-full pointer-events-auto gap-4 bg-white box-border  p-4 shadow-black/50">
              <FileInput />
              <NewPathForm />
              <SearchBar />
              <ResultBar pathSequence={solutionHook.pathSequence} />
            </div>
          </main>
        </SolutionContext.Provider>
      </LocationAndRouteContext.Provider>
    </>
  );
}
