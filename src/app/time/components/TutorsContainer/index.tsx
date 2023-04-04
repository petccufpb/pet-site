import api from "@api";
import { useFetch } from "@hyoretsu/react-hooks";
import { Member } from "@prisma/client";

import { MemberElement } from "../MemberElement";
import { Tutors } from "./styles";

export function TutorsContainer() {
  const { data, error, isLoading } = useFetch("/api/team/tutors", api);

  if (error) return <div>falhou em carregar</div>;
  if (isLoading) return <div>carregando...</div>;

  return (
    <>
      <Tutors>
        {data?.map((member: Member) => (
          <MemberElement member={member} tutor={true} key={member.id} />
        ))}
      </Tutors>
    </>
  );
}
