import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { Background } from "../components/Background";

export const metadata: Metadata = {
  title: "Plataforma | SDC - Início",
  description:
    "Todo semestre o PET Computação (Programa de Educação Tutorial) realiza a Semana da Computação, queacontece junto com a entrada de novos estudantes na universidade. A Semana é dedicada para todosos profissionais da área de TI e ainda dá as boas-vindas aos novos estudantes dos cursos. Aprogramação contempla palestras da área de computação, empreendedorismo, minicursos, workshops,jogos, mesas redondas e mais.",
};
export const revalidate = 0;

export default function SDCLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Background />
    </>
  );
}
