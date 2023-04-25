import { useFetch } from "@hyoretsu/react-hooks";
import { Member } from "backend";

import api from "@api";

import { MemberElement } from "../MemberElement";
import { LoadingIcon, LoadingIconContainer, Members, SectionTitle } from "./styles";

export function MemberList({ type }: { type: "members" | "tutor" | "founder" }) {
  const route = type === "members" ? "/team/members" : "/team/tutors";
  const titles = type === "members" ? ["Membros Ativos", "Membros Inativos"] : ["Fundador", "Tutor"];

  const { data, error, isLoading } = useFetch(route, api);

  if (error)
    return (
      <>
        {titles.map((t, i) => (
          <div key={i}>
            <SectionTitle>{t}</SectionTitle>
            <div>Erro ao carregar.</div>
          </div>
        ))}
      </>
    );

  if (isLoading)
    return (
      <>
        {titles.map((t, i) => (
          <div key={i}>
            <SectionTitle>{t}</SectionTitle>
            <LoadingIconContainer>
              <LoadingIcon size={32} />
            </LoadingIconContainer>
          </div>
        ))}
      </>
    );

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
        <SectionTitle>{titles[0]}</SectionTitle>
        <Members>
          {founder.map((member: Member) => (
            <MemberElement member={member} founder={true} key={member.id} />
          ))}
        </Members>
        <SectionTitle>{titles[1]}</SectionTitle>
        <Members>
          {tutor.map((member: Member) => (
            <MemberElement member={member} tutor={true} key={member.id} />
          ))}
        </Members>
      </div>
    );
  }
}
