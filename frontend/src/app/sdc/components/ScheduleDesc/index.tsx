import { SDC_READY, baiJamjuree, inter } from "@app/sdc/page";
import { SectionTitle } from "@app/sdc/styles";

import { Scrambles } from "@components/ClientTextScramble";

import { ScheduleDescContainer, ScheduleSubtitle, ScheduleTitle } from "./styles";

export function ScheduleDesc() {
  return (
    <ScheduleDescContainer>
      <SectionTitle className={baiJamjuree.className}>MAIS SOBRE A SEMANA DA COMPUTAÇÃO</SectionTitle>
      <ScheduleTitle>
        <Scrambles text={SDC_READY ? "Tudo que você pode participar" : "EM BREVE..."} />
      </ScheduleTitle>
      <ScheduleSubtitle style={inter.style}>
        {SDC_READY
          ? "Abaixo estão listados as palestras, rodas de conversa, mini-cursos e o gameday."
          : "Aguarde, a programação da SDC será revelada em breve!"}
      </ScheduleSubtitle>
    </ScheduleDescContainer>
  );
}
