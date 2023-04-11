import Image from "next/image";
import { Inter } from "next/font/google";
import { useLocationMarker } from "@/customHook/useLocationMarker";
import useWindowDimensions from "@/customHook/useWindowDimension";
import Button from "@/components/Button";
import useRoute from "@/customHook/useRoute";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    locationMarkers,
    addLocationMarker,
    removeLocationMarker,
    getMarkerAt,
    isMarkerInHere,
    resetMarker,
  } = useLocationMarker([]);

  const { routes, addRoute, removeRouteWithNodeIndex, resetRoutes } = useRoute([
    // { destination: 1, source: 2, weight: 50 },
  ]);

  const { width, height } = useWindowDimensions();

  const MapComponent = dynamic(
    () => import("@/components/MapComponent"), // replace '@components/map' with your component's location
    { ssr: false, loading: () => <p>A map is loading</p> } // This line is important. It's what prevents server-side render
  );

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-between w-screen relative">
        <MapComponent
          removeLocationMarker={removeLocationMarker}
          addLocationMarker={addLocationMarker}
          locationMarkers={locationMarkers}
        />
        <div className="w-full flex flex-col items-start justify-end z-[100] pointer-events-none box-border p-2">
          <div className="flex flex-row items-center justify-start relative z-50">
            <div className="flex flex-col items-center justify-center gap-4">
              <Button onClick={resetMarker}>Reset Marker</Button>
              <Button onClick={resetRoutes}>Reset Routes</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
