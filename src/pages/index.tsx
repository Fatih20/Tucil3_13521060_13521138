import Image from "next/image";
import { Inter } from "next/font/google";
import { useLocationMarker } from "@/markerHook";
import { Map, Marker, ZoomControl } from "pigeon-maps";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    locationMarkers,
    addLocationMarker,
    addLocationMarkers,
    removeLocationMarker,
    getMarkerAt,
    isMarkerInHere,
    resetMarker,
  } = useLocationMarker([]);

  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;

  const screenWidth = 500;
  const screenHeight = 500;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full relative">
      <div className="absolute inset-0 w-full">
        <button onClick={resetMarker}>Reset Marker</button>
      </div>

      <Map
        width={screenWidth}
        height={screenHeight}
        defaultCenter={[-6.922, 107.609]}
        defaultZoom={13}
        onClick={({ latLng, event, pixel }) => {
          console.log("Latlng", latLng);
          if (isMarkerInHere(latLng)) {
            return;
          }
          addLocationMarker(latLng);
        }}
      >
        <Marker anchor={[-6.922, 107.609]} color={`hsl(360deg 39% 70%)`}>
          <div className="w-4 h-4 bg-black rounded-sm"></div>
        </Marker>
        {locationMarkers.map((latlng) => {
          console.log(latlng);
          return (
            <Marker
              width={16}
              height={16}
              key={latlng.toString()}
              anchor={latlng}
              color={`hsl(360deg 39% 70%)`}
            >
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            </Marker>
          );
        })}
        <ZoomControl />
      </Map>
    </main>
  );
}
