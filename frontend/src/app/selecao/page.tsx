import Image from "next/image";

import { SelecaoForm } from "./components/Form";
import { Content, FormDescription } from "./styles";

export default function Selecao() {
  return (
    <Content>
      <FormDescription>
        <span>
          <Image src="/images/petrucio.svg" alt="Logo PET Computação" width={120} height={66}></Image>
          <Image src="/images/logo.png" alt="Logo PET Computação" width={100} height={55}></Image>
        </span>
        <h3>Seleção PET 2023.1</h3>
        <h1>Preencha o formulário e faça parte desse time</h1>
      </FormDescription>
      <SelecaoForm />
    </Content>
  );
}
