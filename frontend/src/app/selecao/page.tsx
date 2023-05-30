import Image from "next/image";

import Logo from "@assets/images/logo.svg";
import Petrucio from "@assets/images/petrucio.svg";

import { SelecaoForm } from "./components/Form";
import { Content, FormDescription } from "./styles";

export default function Selecao() {
  return (
    <Content>
      <FormDescription>
        <span>
          <Petrucio alt="Mascote do PET Computação" width={120} height={66}></Petrucio>
          <Logo alt="Logo PET Computação" width={100} height={55}></Logo>
        </span>
        <h3>Seleção PET 2023.1</h3>
        <h1>Preencha o formulário e faça parte desse time</h1>
      </FormDescription>
      <SelecaoForm />
    </Content>
  );
}
