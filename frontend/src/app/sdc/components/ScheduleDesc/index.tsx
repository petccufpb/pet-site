import { SDC_READY } from "@app/sdc/page";
import { SectionTitle } from "@app/sdc/styles";

import { Scrambles } from "@components/Scrambles";

import { ScheduleDescContainer, ScheduleSubtitle, ScheduleTitle } from "./styles";

export function ScheduleDesc() {
  return (
    <ScheduleDescContainer>
      <SectionTitle>MAIS SOBRE A SEMANA DA COMPUTAÇÃO</SectionTitle>
      <ScheduleTitle>
        {SDC_READY ? (
          <span>Tudo que você pode participar</span>
        ) : (
          <Scrambles
            speed={SDC_READY ? 30 : 90}
            text={SDC_READY ? "Tudo que você pode participar" : "EM BREVE..."}
          />
        )}
      </ScheduleTitle>
      <ScheduleSubtitle>
        {SDC_READY
          ? "Abaixo estão listados as palestras, rodas de conversa, mini-cursos e o gameday."
          : "Aguarde, a programação da SDC será revelada em breve!"}
      </ScheduleSubtitle>
    </ScheduleDescContainer>
  );
}
