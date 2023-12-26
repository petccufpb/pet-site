import { PropsWithChildren } from "react";

import { Background } from "../components/Background";

export const metadata = {
  title: "PET Computação - Seleção",
  description: "Formulário de Inscrição para o PET Computação",
};

export default function SDCLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Background />
    </>
  );
}
