import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const AppCore = dynamic(() => import("@/components/AppCore"), {
    ssr: false,
    loading: () => <p>Loading the map</p>,
  });

  return <AppCore />;
}
