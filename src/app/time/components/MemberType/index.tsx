import { Member } from "@prisma/client";

import { Content } from "./styles";

export function MemberType({ member, tutor }: { member: Member; tutor?: boolean }) {
  let info: string;
  if (tutor) {
    info = `${member.type === "founder" ? "Fundador" : "Tutor Atual"} do PET CC`;
  } else {
    info = `Membro Ativo${member.type === "decano" ? " (Decano)" : ""}`;
  }
  return <Content>{info}</Content>;
}
