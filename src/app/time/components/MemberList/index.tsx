import api from "@api";
import { useFetch } from "@hyoretsu/react-hooks";
import { Member } from "@prisma/client";

import { MemberElement } from "../MemberElement";
import { LoadingIcon, LoadingIconContainer, Members, SectionTitle } from "./styles";

export function MemberList({ type }: { type: "members" | "tutors" }) {
  const route = type === "members" ? "/api/team/members" : "/api/team/tutors";
  const titles = type === "members" ? ["Membros Ativos", "Membros Inativos"] : ["Tutores"];

  const { data, error, isLoading } = useFetch(route, api);

  if (error)
    return (
      <>
        {titles.map(t => {
          <div>
            <SectionTitle>{t}</SectionTitle>
            <div>Erro ao carregar.</div>
          </div>;
        })}
      </>
    );

  if (isLoading)
    return (
      <>
        {titles.map(t => {
          <div>
            <SectionTitle>{t}</SectionTitle>
            <LoadingIconContainer>
              <LoadingIcon size={32} />
            </LoadingIconContainer>
          </div>;
        })}
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
    return (
      <div>
        <SectionTitle>{titles[0]}</SectionTitle>
        <Members>
          {members.map((member: Member) => (
            <MemberElement member={member} tutor={true} key={member.id} />
          ))}
        </Members>
      </div>
    );
  }
}
