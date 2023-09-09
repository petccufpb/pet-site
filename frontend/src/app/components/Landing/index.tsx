import Petrucio from "@assets/images/petrucio.svg?svgr";

import { BackgroundDaSilva, LandingContainer, LeftSide, RightSide } from "./styles";

export function Landing() {
  return (
    <LandingContainer>
      <LeftSide>
        <svg width="1063" height="861" viewBox="0 0 1063 861" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M463 469C147.8 501 -24.3333 743.667 -71 861V-87L1063 -119C994.333 63.6667 778.2 437 463 469Z"
            fill="#2E3F70"
          />
        </svg>
        <div>Universidade Federal da Paraíba</div>
        <h1>
          Bem-vindo ao
          <br />
          Universo do PET!
        </h1>
        <div>
          Aqui você fica por dentro de tudo, e conhece mais um pouco de
          <br />
          tudo que acontece no PET!
        </div>
        <a href="/sobre">Conheça-nos</a>
      </LeftSide>
      <RightSide>
        <div>
          <BackgroundDaSilva
            width="700"
            height="700"
            viewBox="0 0 700 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="350" cy="350" r="350" fill="#2E3F70" />
          </BackgroundDaSilva>
          <Petrucio width={700} />
        </div>
      </RightSide>
    </LandingContainer>
  );
}
