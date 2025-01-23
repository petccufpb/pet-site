"use client";

import { SectionTitle } from "@app/sdc/styles";
import { useMemo, useState } from "react";
import { HiArrowUpRight, HiXMark } from "react-icons/hi2";
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
  const [currentDay, setCurrentDay] = useState<number>(new Date(data.events[0]?.startTime || "").getDate());
  const days: number[] = [
    ...new Set(
      data.events
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
        .map(event => new Date(event.startTime).getDate()),
    ),
  ];

  const dayEvents = useMemo(() => {
    let events = [...data.events];

    if (currentDay) {
      events = events.filter(
        event =>
          currentDay >= new Date(event.startTime).getDate() &&
          currentDay <= new Date(event.endTime).getDate(),
      );
    }

    return events
      .sort((a, b) => new Date(a.startTime).getMinutes() - new Date(b.startTime).getMinutes())
      .sort((a, b) => new Date(a.startTime).getHours() - new Date(b.startTime).getHours());
  }, [currentDay, data.events]);

  function changeSelectedDay(day: number) {
    if (currentDay === day) {
      setCurrentDay(0);
      return;
    }

    if (day) setCurrentDay(day);
  }

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
        {dayEvents.map(e => {
          const available = e.capacity ? e.participants.length < e.capacity + e.extraCapacity : true;
          return (
            <EventContainer
              key={e.id}
              aria-label="Realizar Inscrição"
              href={e.type === "minicurso" ? `/sdc/minicurso/${e.id}` : "/sdc/inscricao"}
              disabled={e.type !== "minicurso" || !available}
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
                  <Availability available={available}>
                    {available ? (
                      <>
                        <span>Inscreva-se</span>
                        <HiArrowUpRight height="1em" />
                      </>
                    ) : (
                      <>
                        <span>Esgotado</span>
                        <HiXMark height="1em" />
                      </>
                    )}
                  </Availability>
                ) : (
                  <div />
                )}
                <div>
                  Dia {days.indexOf(currentDay) + 1} -{" "}
                  {new Date(e.startTime).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </Event>
            </EventContainer>
          );
        })}
      </Table>
    </SdcScheduleContainer>
  );
}
