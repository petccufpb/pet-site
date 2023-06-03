"use client";

import { SectionTitle } from "@app/sdc/styles";
import { MouseEvent, useEffect, useState } from "react";
import type { SDCScheduleData } from "sdc";

import { SdcActivity } from "../SdcActivity";
import { Day, DaySelector, SdcScheduleContainer, Table } from "./styles";

export function SdcSchedule({ data }: { data: SDCScheduleData }) {
  const days: number[] = [...new Set(data.events.map(event => new Date(event.startTime).getDate()).sort())];

  const [currentDay, setCurrentDay] = useState(1);
  const [dayEvents, setDayEvents] = useState(
    data.events.filter(event => new Date(event.startTime).getDate() === currentDay),
  );

  function changeSelectedDay(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const element = e.target as HTMLDivElement;
    const day = Number(element.dataset.day);

    if (day) setCurrentDay(day);
  }

  useEffect(() => {
    setDayEvents(data.events.filter(event => new Date(event.startTime).getDate() === currentDay));
  }, [currentDay, data.events]);

  return (
    <SdcScheduleContainer>
      <SectionTitle>Clique e filtre todos os eventos de um dia específico</SectionTitle>
      <DaySelector onClick={changeSelectedDay}>
        {days.map(day => (
          <Day key={day} selected={currentDay === day} data-day={day}>
            Dia {day}
          </Day>
        ))}
      </DaySelector>
      <Table>
        <tbody>
          <tr>
            <th>Ministrante</th>
            <th>Tipo</th>
            <th>Dia</th>
            <th>Hora</th>
            <th>Vagas</th>
            <th></th>
          </tr>
          {dayEvents.map(e => (
            <SdcActivity key={e.id} data={e} />
          ))}
        </tbody>
      </Table>
    </SdcScheduleContainer>
  );
}
