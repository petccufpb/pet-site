"use client";

import { SectionTitle } from "@app/sdc/styles";
import { useEffect, useState } from "react";
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
  const [currentDay, setCurrentDay] = useState<number | null>(new Date(data.events[0].startTime).getDate());
  const days: number[] = [...new Set(data.events.map(event => new Date(event.startTime).getDate()).sort())];

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
        {dayEvents
          .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
          .map(e => (
            <EventContainer
              key={e.id}
              aria-label="Realizar Inscrição"
              href={e.type === "minicurso" ? `/sdc/minicurso/${e.id}` : "/sdc/inscricao"}
              disabled={e.type !== "minicurso"}
            >
              <SpeakerPhoto
                width={45}
                height={45}
                src={e.speaker.photoUrl}
                alt={e.speaker.name}
              ></SpeakerPhoto>
              <Event available={true}>
                <div>{e.speaker.name}</div>
                <div>{e.name}</div>
                {e.type === "minicurso" ? (
                  <Availability
                    available={e.capacity ? e.participants.length < e.capacity + e.extraCapacity : true}
                  >
                    <span>Inscreva-se</span>
                    <HiArrowUpRight height="1em" />
                  </Availability>
                ) : (
                  <div />
                )}
                <div>
                  Dia {days.indexOf(new Date(e.startTime).getDate()) + 1} -{" "}
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
