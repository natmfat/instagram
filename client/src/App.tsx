import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Header } from "./components/Header";
import { Threads } from "./components/Threads";
import { Navigation } from "./components/Navigation";

export default function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="max-w-xl mx-auto px-4">
        <Header />
        <Navigation />
        <Threads />
      </div>
    </SWRConfig>
  );
}
