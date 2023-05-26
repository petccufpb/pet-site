"use client";

import { baiJamjuree } from "@app/sdc/page";
import { SectionTitle } from "@app/sdc/styles";
import { MouseEvent, useEffect, useState } from "react";

import { SdcActivity } from "../SdcActivity";
import { Day, DaySelector, SdcScheduleContainer, Table } from "./styles";

export function SdcSchedule() {
  const [currentDay, setCurrentDay] = useState(1);

  function changeSelectedDay(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const element = e.target as HTMLDivElement;
    const day = Number(element.dataset.day);

    if (day) setCurrentDay(day);
  }

  return (
    <SdcScheduleContainer className={baiJamjuree.className}>
      <SectionTitle>Clique e filtre todos os eventos de um dia específico</SectionTitle>
      <DaySelector onClick={changeSelectedDay}>
        <Day selected={currentDay === 1} data-day={1}>
          Dia 01
        </Day>
        <Day selected={currentDay === 2} data-day={2}>
          Dia 02
        </Day>
        <Day selected={currentDay === 3} data-day={3}>
          Dia 03
        </Day>
        <Day selected={currentDay === 4} data-day={4}>
          Dia 04
        </Day>
      </DaySelector>
      <Table className={baiJamjuree.className}>
        <tbody>
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
              time: "10:00",
              available: false,
              type: "minicurso",
            }}
          />
        </tbody>
      </Table>
    </SdcScheduleContainer>
  );
}
