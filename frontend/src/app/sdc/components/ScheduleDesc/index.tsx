import { baiJamjuree, inter } from "@app/sdc/page";
import { SectionTitle } from "@app/sdc/styles";

import { ScheduleDescContainer, ScheduleSubtitle, ScheduleTitle } from "./styles";

export function ScheduleDesc() {
  return (
    <ScheduleDescContainer>
      <SectionTitle className={baiJamjuree.className}>MAIS SOBRE A SEMANA DA COMPUTAÇÃO</SectionTitle>
      <ScheduleTitle>Tudo que você pode participar</ScheduleTitle>
      <ScheduleSubtitle className={inter.className}>
        Abaixo estão listados as palestras, rodas de conversa, mini-cursos e o gameday.
      </ScheduleSubtitle>
    </ScheduleDescContainer>
  );
}
