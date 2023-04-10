import Image from "next/image";
import { Inter } from "next/font/google";
import { useLocationMarker } from "@/customHook/useLocationMarker";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import useWindowDimensions from "@/customHook/useWindowDimension";
import Button from "@/components/Button";

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
  const { width, height } = useWindowDimensions();

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-between w-screen relative">
        <div className="absolute inset-0 w-full h-full flex flex-col items-start justify-end z-10 pointer-events-none box-border p-2">
          <div className="flex flex-row items-center justify-start">
            <Button onClick={resetMarker}>Reset Marker</Button>
          </div>
        </div>

        <Map
          width={width ?? 500}
          height={height ?? 500}
          defaultCenter={[-6.922, 107.609]}
          defaultZoom={13}
          onClick={({ latLng, event, pixel }) => {
            if (isMarkerInHere(latLng)) {
              return;
            }
            addLocationMarker(latLng);
          }}
        >
          {locationMarkers.map((latlng, index) => {
            return (
              <Marker
                width={30}
                height={30}
                key={latlng.toString()}
                anchor={latlng}
                color={`hsl(360deg 39% 70%)`}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-white">{index + 1}</p>
                  </div>
                  <Image
                    src={"/locationIcon.svg"}
                    width={30}
                    height={30}
                    alt={"Location Marker"}
                  />
                </div>
              </Marker>
            );
          })}
          <ZoomControl />
        </Map>
      </main>
    </>
  );
}
