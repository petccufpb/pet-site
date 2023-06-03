import Certificate from "@assets/images/certificate.svg?svgr";
import CoffeeBreak from "@assets/images/coffee-break.svg?svgr";
import Minicurso from "@assets/images/minicurso.svg?svgr";
import Networking from "@assets/images/networking.svg?svgr";

import { Feature, FeatureListContainer } from "./styles";

export function FeatureList() {
  return (
    <FeatureListContainer>
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
