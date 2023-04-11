import Image from "next/image";
import { Inter } from "next/font/google";
import {
  useLocationMarker,
  UseLocationMarkerHook,
} from "@/customHook/useLocationMarker";
import useWindowDimensions from "@/customHook/useWindowDimension";
import Button from "@/components/Button";
import useRoute, { UseRouteHook } from "@/customHook/useRoute";
import dynamic from "next/dynamic";
import { createContext } from "react";

export const LocationMarkerContext = createContext<UseLocationMarkerHook>(
  {} as UseLocationMarkerHook
);

export const RouteContext = createContext<UseRouteHook>({} as UseRouteHook);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const locationMarkerHook = useLocationMarker([]);
  const routeHook = useRoute([]);

  const { width, height } = useWindowDimensions();

  const MapComponent = dynamic(
    () => import("@/components/MapComponent"), // replace '@components/map' with your component's location
    { ssr: false, loading: () => <p>A map is loading</p> } // This line is important. It's what prevents server-side render
  );

  return (
    <>
      <LocationMarkerContext.Provider value={locationMarkerHook}>
        <RouteContext.Provider value={routeHook}>
          <main className="flex h-screen flex-col items-center justify-between w-screen relative">
            <MapComponent />
            <div className="w-full flex flex-col items-start justify-end z-[100] pointer-events-none box-border p-2">
              <div className="flex flex-row items-center justify-start relative z-50">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Button onClick={locationMarkerHook.resetMarker}>
                    Reset Marker
                  </Button>
                  <Button onClick={routeHook.resetRoutes}>Reset Routes</Button>
                </div>
              </div>
            </div>
          </main>
        </RouteContext.Provider>
      </LocationMarkerContext.Provider>
    </>
  );
}
