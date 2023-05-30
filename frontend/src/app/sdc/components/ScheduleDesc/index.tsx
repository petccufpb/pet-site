import { ClientTypeIt } from "@app/components/ClientTypeIt";
import { SDC_READY, baiJamjuree, inter } from "@app/sdc/page";
import { SectionTitle } from "@app/sdc/styles";

import { ScheduleDescContainer, ScheduleSubtitle, ScheduleTitle } from "./styles";

export function ScheduleDesc() {
  return (
    <ScheduleDescContainer>
      <SectionTitle className={baiJamjuree.className}>MAIS SOBRE A SEMANA DA COMPUTAÇÃO</SectionTitle>
      <ScheduleTitle>
        <ClientTypeIt
          sdcReady={SDC_READY}
          options={{
            speed: 150,
            waitUntilVisible: true,
            startDelay: 300,
          }}
        ></ClientTypeIt>
      </ScheduleTitle>
      <ScheduleSubtitle style={inter.style}>
        {SDC_READY
          ? "Abaixo estão listados as palestras, rodas de conversa, mini-cursos e o gameday."
          : "Aguarde, a programação da SDC será revelada em breve!"}
      </ScheduleSubtitle>
    </ScheduleDescContainer>
  );
}
