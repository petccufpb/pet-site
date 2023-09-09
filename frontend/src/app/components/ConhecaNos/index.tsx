import Image from "next/image";
import { FaGraduationCap, FaNetworkWired, FaSearchengin } from "react-icons/fa6";

import PetrucioDuvidoso from "@assets/images/petrucio-duvidoso.png";

import { BGExtender, BottomSide, Card, ConhecaContainer, LeftSide, RightSide, UpperSide } from "./styles";

export function ConhecaNos() {
  return (
    <ConhecaContainer>
      <UpperSide>
        <BGExtender />
        <LeftSide>
          <h1>Conheça o PET Computação</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nisi facilisis, auctor dolor
            vitae, rutrum lacus. Sed congue rhoncus ex, non elementum dui tempus in. Maecenas malesuada magna
            ac finibus maximus. Duis aliquet auctor sem, porta vulputate velit faucibus ac. Aliquam vel quam
            nisi. Pellentesque viverra dui nec lorem interdum, sed accumsan ipsum pellentesque. Nullam
            vulputate condimentum fringilla.
          </div>
        </LeftSide>
        <RightSide>
          <Image src={PetrucioDuvidoso} alt="Petrúcio Curioso" />
        </RightSide>
      </UpperSide>
      <BottomSide>
        <Card>
          <FaSearchengin size="2.5em" color="#38BCDE" />
          <h1>Pesquisa</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nisi facilisis, auctor dolor
            vitae, rutrum lacus. Sed congue rhoncus ex, non elementum dui tempus in. Maecenas malesuada magna
            ac finibus maximus.
          </span>
        </Card>
        <Card>
          <FaGraduationCap size="2.5em" color="#38BCDE" />
          <h1>Ensino</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nisi facilisis, auctor dolor
            vitae, rutrum lacus. Sed congue rhoncus ex, non elementum dui tempus in. Maecenas malesuada magna
            ac finibus maximus.
          </span>
        </Card>
        <Card>
          <FaNetworkWired size="2.5em" color="#38BCDE" />
          <h1>Extensão</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nisi facilisis, auctor dolor
            vitae, rutrum lacus. Sed congue rhoncus ex, non elementum dui tempus in. Maecenas malesuada magna
            ac finibus maximus.
          </span>
        </Card>
      </BottomSide>
    </ConhecaContainer>
  );
}
