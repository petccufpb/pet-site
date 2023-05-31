import { FaChevronLeft } from "react-icons/fa";

import { ErrorPageContainer } from "./styles";

export default function ErrorPage({
  title,
  subtitle,
  goBackButton = false,
}: {
  title: string;
  subtitle: string;
  goBackButton?: boolean | undefined;
}) {
  return (
    <ErrorPageContainer>
      {goBackButton && (
        <a href="/sdc">
          <FaChevronLeft size="1em" />
          <span>Voltar para o Início</span>
        </a>
      )}
      <span>{title}</span>
      <div>{subtitle}</div>
    </ErrorPageContainer>
  );
}
