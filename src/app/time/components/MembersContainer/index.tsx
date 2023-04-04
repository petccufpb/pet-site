import api from "@api";
import { Members, SectionTitle } from "@app/time/styles";
import { useFetch } from "@hyoretsu/react-hooks";
import { Member } from "@prisma/client";

import { MemberElement } from "../MemberElement";

export function MembersContainer() {
  const { data, error, isLoading } = useFetch("/api/team/members", api);

  if (error) return <div>falhou em carregar</div>;
  if (isLoading) return <div>carregando...</div>;

  return (
    <>
      <Members>
        {data?.map((member: Member) => (
          <MemberElement member={member} tutor={false} key={member.id} />
        ))}
      </Members>
    </>
  );
}
