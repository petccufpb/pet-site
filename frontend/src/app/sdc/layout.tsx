import { Metadata } from "next";
import Head from "next/head";
import { PropsWithChildren } from "react";

import { Background } from "./components/Background";

export const metadata: Metadata = {
  title: "Semana da Computação - PET Computação UFPB",
  description:
    "Todo semestre o PET Computação (Programa de Educação Tutorial) realiza a Semana da Computação, queacontece junto com a entrada de novos estudantes na universidade. A Semana é dedicada para todosos profissionais da área de TI e ainda dá as boas-vindas aos novos estudantes dos cursos. Aprogramação contempla palestras da área de computação, empreendedorismo, minicursos, workshops,jogos, mesas redondas e mais.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title key={0}>Semana da Computação - PET Computação UFPB</title>
        <meta
          key={1}
          name="description"
          content="Todo semestre o PET Computação (Programa de Educação Tutorial) realiza a Semana da Computação, queacontece junto com a entrada de novos estudantes na universidade. A Semana é dedicada para todosos profissionais da área de TI e ainda dá as boas-vindas aos novos estudantes dos cursos. Aprogramação contempla palestras da área de computação, empreendedorismo, minicursos, workshops,jogos, mesas redondas e mais."
        />
      </Head>
      {children}
      <Background />
    </>
  );
}
