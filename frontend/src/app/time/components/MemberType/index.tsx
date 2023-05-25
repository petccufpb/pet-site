import { Member } from "backend";

import { Content } from "./styles";

export function MemberType({ member }: { member: Member }) {
  let info: string;
  if (member.type === "tutor") {
    info = "Tutor do PET CC";
  } else if (member.type === "founder") {
    info = "Fundador do PET CC";
  } else if (member.isActive) {
    info = `Membro Ativo${member.type === "decano" ? " (Decano)" : ""}`;
  } else {
    info = "Membro Inativo";
  }

  return <Content>{info}</Content>;
}
