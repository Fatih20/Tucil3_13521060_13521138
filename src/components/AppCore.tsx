import Image from "next/image";
import { Inter } from "next/font/google";
import {
  UseLocationAndRouteHook,
  useLocationAndRoute,
} from "@/customHook/useLocationAndRoute";
import useWindowDimensions from "@/customHook/useWindowDimension";
import dynamic from "next/dynamic";
import { createContext } from "react";
import NewPathForm from "@/components/NewPathForm";
import FileInput from "@/components/FileInput";

export const LocationAndRouteContext = createContext<UseLocationAndRouteHook>(
  {} as UseLocationAndRouteHook
);

export default function AppCore() {
  const locationAndRouteHook = useLocationAndRoute([], []);
  const { width, height } = useWindowDimensions();

  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
    loading: () => <p>Loading the map</p>,
  });

  return (
    <>
      <LocationAndRouteContext.Provider value={locationAndRouteHook}>
        <main className="flex h-screen flex-col items-center justify-between w-screen relative bg-white">
          <MapComponent />
          <div className="w-full flex flex-col items-start justify-end z-[100] pointer-events-none box-border p-2">
            <div className="flex flex-row items-start justify-start w-full pointer-events-auto gap-2">
              <div className="flex flex-col items-center justify-center gap-4">
                <button
                  className="btn btn-small pointer-events-auto"
                  onClick={locationAndRouteHook.resetMarker}
                >
                  Reset Marker
                </button>
                <button
                  className="btn btn-small pointer-events-auto"
                  onClick={locationAndRouteHook.resetRoutes}
                >
                  Reset Routes
                </button>
              </div>
              <NewPathForm />
              <FileInput />
            </div>
          </div>
        </main>
      </LocationAndRouteContext.Provider>
    </>
  );
}
