import { APIError, Tutor } from "@types/hooks";
import { Member } from "backend";

import { MemberElement } from "../MemberElement";
import { Members, SectionTitle } from "./styles";

export function MemberList({
  type,
  data,
}: {
  type: "members" | "tutor" | "founder";
  data: Member | Member[] | APIError | Tutor[];
}) {
  const titles = type === "members" ? ["Membros Ativos", "Membros Inativos"] : ["Fundador", "Tutor"];

  const members = data as Member[];

  if (type === "members") {
    const activeMembers = members.filter(m => m.isActive);
    const inactiveMembers = members.filter(m => !m.isActive);

    return (
      <div>
        <SectionTitle>{titles[0]}</SectionTitle>
        <Members>
          {activeMembers.map((member: Member) => (
            <MemberElement member={member} tutor={false} key={member.id} />
          ))}
        </Members>
        <SectionTitle>{titles[1]}</SectionTitle>
        <Members>
          {inactiveMembers.map((member: Member) => (
            <MemberElement member={member} tutor={false} key={member.id} />
          ))}
        </Members>
      </div>
    );
  } else {
    const founder = members.filter(m => m.type === "founder");
    const tutor = members.filter(m => m.type === "tutor");

    return (
      <div>
        <SectionTitle>{titles[1]}</SectionTitle>
        <Members>
          {tutor.map((member: Member) => (
            <MemberElement member={member} tutor={true} key={member.id} />
          ))}
        </Members>
        <SectionTitle>{titles[0]}</SectionTitle>
        <Members>
          {founder.map((member: Member) => (
            <MemberElement member={member} founder={true} key={member.id} />
          ))}
        </Members>
      </div>
    );
  }
}
