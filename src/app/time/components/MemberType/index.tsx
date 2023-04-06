import { Member } from "@prisma/client";

import { Content } from "./styles";

export function MemberType({ member, tutor }: { member: Member; tutor?: boolean }) {
  let info: string;
  if (tutor) {
    info = `${member.type === "founder" ? "Fundador" : "Tutor Atual"} do PET CC`;
  } else if (member.isActive) {
    info = `Membro Ativo${member.type === "decano" ? " (Decano)" : ""}`;
  } else {
    info = "Membro Inativo";
  }

  return <Content>{info}</Content>;
}
