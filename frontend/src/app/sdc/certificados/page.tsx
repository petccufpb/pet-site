import { Metadata } from "next";

import { CertificadoForm } from "./components/CertificadoForm";
import { Container, Description } from "./styles";

export const metadata: Metadata = {
  title: "Plataforma | SDC - Certificados",
};

export default function Certificados() {
  return (
    <Container>
      <Description>
        <h1>Autenticador</h1>
        <div>
          <div>Precisamos de algumas informações para verificar a autenticidade</div>
          <div>do seu documento.</div>
        </div>
      </Description>
      <CertificadoForm />
    </Container>
  );
}
