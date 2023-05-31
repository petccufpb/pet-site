import { Metadata } from "next";
import Head from "next/head";

import { Background as SDCBackground } from "./sdc/components/Background";
import ErrorPage from "./sdc/components/ErrorPage";

export default function NotFound() {
  return (
    <>
      {/* No momento da criação dessa página, não é possível exportar metadados em um "not-found" */}
      {/* https://github.com/vercel/next.js/issues/45620 */}
      <title>Plataforma | SDC - Não encontrado</title>
      <SDCBackground />
      <ErrorPage
        title="Não encontrado"
        subtitle="Esta página não foi encontrada no sistema."
        goBackButton={true}
      />
    </>
  );
}
