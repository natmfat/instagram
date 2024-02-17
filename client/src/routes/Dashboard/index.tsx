import { Header } from "./components/Header";
import { Threads } from "./components/Threads";
import { Navigation } from "./components/Navigation";

export const Dashboard = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Threads />
    </>
  );
};
