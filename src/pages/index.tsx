import Image from "next/image";
import { Inter } from "next/font/google";
import { useLocationMarker } from "@/customHook/useLocationMarker";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import useWindowDimensions from "@/customHook/useWindowDimension";
import Head from "next/head";

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
      <main className="flex min-h-screen flex-col items-center justify-between w-full relative">
        <div className="absolute inset-0 w-full flex flex-col items-end justify-center z-10 pointer-events-none"></div>

        <Map
          width={width ?? 500}
          height={height ?? 500}
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
                <Image
                  src={"/locationIcon.svg"}
                  width={16}
                  height={16}
                  alt={"Location Marker"}
                />
              </Marker>
            );
          })}
          <ZoomControl />
        </Map>
      </main>
    </>
  );
}
