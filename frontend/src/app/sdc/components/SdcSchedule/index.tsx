import { baiJamjuree } from "@app/sdc/page";
import { SectionTitle } from "@app/sdc/styles";
import { HiArrowUpRight } from "react-icons/hi2";

import { SdcActivity } from "../SdcActivity";
import { Day, DaySelector, SdcScheduleContainer, Table } from "./styles";

export function SdcSchedule() {
  return (
    <SdcScheduleContainer className={baiJamjuree.className}>
      <SectionTitle>Clique e filtre todos os eventos de um dia específico</SectionTitle>
      <DaySelector>
        <Day>Dia 01</Day>
        <Day>Dia 02</Day>
        <Day>Dia 03</Day>
        <Day>Dia 04</Day>
      </DaySelector>
      <Table className={baiJamjuree.className}>
        <tr>
          <th>Ministrante</th>
          <th>Tipo</th>
          <th>Dia</th>
          <th>Hora</th>
          <th>Vagas</th>
          <th></th>
        </tr>
        <SdcActivity
          info={{
            title: "Um kinder ovo vale mais que um diploma",
            speaker: "Bruno Buck",
            day: 1,
            time: "09:45",
            available: true,
            type: "palestra",
          }}
        />
        <SdcActivity
          info={{
            title: "Como usar o CHAT GPT",
            speaker: "Samanthinha",
            day: 2,
            time: "08:00",
            available: false,
            type: "palestra",
          }}
        />
        <SdcActivity
          info={{
            title: "Como ser RICO",
            speaker: "Leonardo Vidal",
            day: 3,
            time: "10:0",
            available: false,
            type: "minicurso",
          }}
        />
      </Table>
    </SdcScheduleContainer>
  );
}
