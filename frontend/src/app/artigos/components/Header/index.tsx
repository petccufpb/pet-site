import logoSrc from "@assets/images/logoSrc.svg";

import { HeaderContainer } from "./styles";
export function Header() {
  return (
    <HeaderContainer>
      <img src={logoSrc} alt={"Petrucio"} />
    </HeaderContainer>
  );
}
