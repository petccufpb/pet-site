import { ComponentProps, ReactNode } from "react";
import { FaUpRightFromSquare } from "react-icons/fa6";

import { ExternalLinkContainer } from "./styles";

type ExternalLinkProps = ComponentProps<typeof ExternalLinkContainer> & {
  text: string;
  icon?: ReactNode;
  variant?: "iconLeft";
};

export function ExternalLink({ text, icon, ...rest }: ExternalLinkProps) {
  return (
    <ExternalLinkContainer {...rest}>
      {text}
      {icon ?? <FaUpRightFromSquare />}
    </ExternalLinkContainer>
  );
}
