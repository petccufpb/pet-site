import { baiJamjuree } from "@app/sdc/page";

import Certificate from "@assets/certificate.svg";
import CoffeeBreak from "@assets/coffee-break.svg";
import Minicurso from "@assets/minicurso.svg";
import Networking from "@assets/networking.svg";

import { Feature, FeatureListContainer } from "./styles";

export function FeatureList() {
  return (
    <FeatureListContainer className={baiJamjuree.className}>
      <Feature>
        <Networking />
        <span>
          <h3>100% NETWORKING</h3>
          <div>Compartilhe todas suas experiências e faça novos amigos.</div>
        </span>
      </Feature>
      <Feature>
        <Minicurso />
        <span>
          <h3>MINICURSOS</h3>
          <div>Corre e já garante sua vaga os minicursos lotam rápido.</div>
        </span>
      </Feature>
      <Feature>
        <Certificate />
        <span>
          <h3>CERTIFICADOS</h3>
          <div>Complemente o seu currículo com certificados de participação e aprendizado.</div>
        </span>
      </Feature>
      <Feature>
        <CoffeeBreak />
        <span>
          <h3>COFFEE BREAK</h3>
          <div>E sempre teremos aquela pausinha entre o evento para fazer um lanche.</div>
        </span>
      </Feature>
    </FeatureListContainer>
  );
}
