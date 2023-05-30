import { Background as SDCBackground } from "./sdc/components/Background";
import ErrorPage from "./sdc/components/ErrorPage";

export default function NotFound() {
  return (
    <>
      <SDCBackground />
      <ErrorPage
        title="Não encontrado"
        subtitle="Esta página não foi encontrada no sistema."
        goBackButton={true}
      />
    </>
  );
}
