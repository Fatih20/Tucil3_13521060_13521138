import dynamic from "next/dynamic";

export default function Home() {
  const AppCore = dynamic(() => import("@/components/AppCore"), {
    ssr: false,
    loading: () => <p>Loading the map</p>,
  });

  return <AppCore />;
}
