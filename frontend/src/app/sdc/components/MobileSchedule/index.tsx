"use client";

import { SectionTitle } from "@app/sdc/styles";
import { MouseEvent, useEffect, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { SDCScheduleData } from "sdc";

import {
  Availability,
  Day,
  DaySelector,
  Event,
  EventContainer,
  SdcScheduleContainer,
  SpeakerPhoto,
  Table,
} from "./styles";

export function MobileSchedule({ data }: { data: SDCScheduleData }) {
  const [currentDay, setCurrentDay] = useState(1);
  const days: number[] = [...new Set(data.events.map(event => new Date(event.startTime).getDate()).sort())];

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
        {dayEvents.map(e => (
          <EventContainer
            key={e.id}
            aria-label="Realizar Inscrição"
            href={e.type === "main" ? "/sdc/inscricao" : `/sdc/minicurso/${e.id}`}
          >
            <SpeakerPhoto
              width={45}
              height={45}
              src={"https://" + e.speaker.photoUrl}
              alt={e.speaker.name}
            ></SpeakerPhoto>
            <Event available={true}>
              <div>{e.speaker.name}</div>
              <div>Um kinder ovo vale mais que um diploma</div>
              <Availability available={data.capacity ? data.participants.length < data.capacity : true}>
                <span>Inscreva-se</span>
                <HiArrowUpRight height="1em" />
              </Availability>
              <div>
                Dia {new Date(e.startTime).getDate()} -{" "}
                {new Date(e.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </Event>
          </EventContainer>
        ))}
      </Table>
    </SdcScheduleContainer>
  );
}
