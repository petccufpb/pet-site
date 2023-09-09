import { Metadata } from "next";

import { ConhecaNos } from "./components/ConhecaNos";
import { Landing } from "./components/Landing";
import Noticias from "./components/Noticias/page";
import Sponsors from "./components/Sponsors/page";
import { HomeContainer } from "./styles";

export const metadata: Metadata = {
  title: "PET Computação - Início",
};

export default function Home() {
  return (
    <HomeContainer>
      <Landing />
      <ConhecaNos />
      <Noticias />
      <Sponsors />
    </HomeContainer>
  );
}
