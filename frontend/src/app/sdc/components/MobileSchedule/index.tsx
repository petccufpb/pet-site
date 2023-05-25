import { baiJamjuree } from "@app/sdc/page";
import { SectionTitle } from "@app/sdc/styles";
import { MouseEvent, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

import Leleo from "@assets/leleo.png";

import { Day, DaySelector, Event, EventContainer, SdcScheduleContainer, SpeakerPhoto, Table } from "./styles";

export function MobileSchedule() {
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
      <Table>
        <EventContainer href="/sdc">
          <SpeakerPhoto src={Leleo} alt="Palestrante"></SpeakerPhoto>
          <Event available={true}>
            <div>Bruno Bruck</div>
            <div>Um kinder ovo vale mais que um diploma</div>
            <span>
              <FaCheck />
              <span>Palestra</span>
            </span>
            <div>Dia 1 - 09:45</div>
          </Event>
        </EventContainer>
        <EventContainer href="/sdc">
          <SpeakerPhoto src={Leleo} alt="Palestrante"></SpeakerPhoto>
          <Event available={false}>
            <div>Samantha</div>
            <div>Como Desenhar o Petrúcio</div>
            <span>
              <FaTimes />
              <span>Minicurso (esgotado)</span>
            </span>
            <div>Dia 2 - 08:00</div>
          </Event>
        </EventContainer>
        <EventContainer href="/sdc/minicurso/id">
          <SpeakerPhoto src={Leleo} alt="Palestrante"></SpeakerPhoto>
          <Event available={true}>
            <div>Leonardo Vidal</div>
            <div>Como Ficar Rico</div>
            <span>
              <FaCheck />
              <span>Palestra</span>
            </span>
            <div>Dia 3 - 10:00</div>
          </Event>
        </EventContainer>
      </Table>
    </SdcScheduleContainer>
  );
}
