"use client";

import { SectionTitle } from "@app/sdc/styles";
import { MouseEvent, useEffect, useState } from "react";
import type { SDCScheduleData } from "sdc";

import { SdcActivity } from "../SdcActivity";
import { Day, DaySelector, SdcScheduleContainer, Table } from "./styles";

export function SdcSchedule({ data }: { data: SDCScheduleData }) {
  const days: number[] = [
    ...new Set(
      data.events
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
        .map(event => new Date(event.startTime).getDate()),
    ),
  ];

  const [currentDay, setCurrentDay] = useState<number | null>(
    new Date(data.events[0]?.startTime || "").getDate(),
  );
  const [dayEvents, setDayEvents] = useState(
    data.events.filter(event => new Date(event.startTime).getDate() === currentDay),
  );

  function changeSelectedDay(day: number) {
    if (currentDay === day) {
      setCurrentDay(null);
      return;
    }

    if (day) setCurrentDay(day);
  }

  useEffect(() => {
    if (currentDay) {
      setDayEvents(data.events.filter(event => new Date(event.startTime).getDate() === currentDay));
    } else {
      setDayEvents(
        data.events.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
      );
    }
  }, [currentDay, data.events]);

  return (
    <SdcScheduleContainer>
      <SectionTitle id="programacao">Clique e filtre todos os eventos de um dia específico</SectionTitle>
      <DaySelector>
        {days.map((day, i) => (
          <Day key={day} selected={currentDay === day} onClick={() => changeSelectedDay(day)}>
            Dia {i + 1}
          </Day>
        ))}
      </DaySelector>
      <Table>
        <tbody>
          <tr>
            <th>Ministrante</th>
            <th>Título</th>
            <th>Dia</th>
            <th>Hora</th>
            <th>Vagas</th>
            <th></th>
          </tr>
          {dayEvents.map(e => (
            <SdcActivity key={e.id} data={e} dayEvent={days.indexOf(new Date(e.startTime).getDate()) + 1} />
          ))}
        </tbody>
      </Table>
    </SdcScheduleContainer>
  );
}
