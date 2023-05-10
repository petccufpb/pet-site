"use client";

import { baiJamjuree, inter } from "@app/sdc/page";
import { HiArrowRight, HiClock } from "react-icons/hi2";
import { RiCalendarLine, RiTimeLine } from "react-icons/ri";

import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  DateContainer,
  InputContainer,
  SdcFormContainer,
} from "./styles";

function DateOrNothing({ date }: { date?: { day: string; time: string } }) {
  if (date) {
    return (
      <DateContainer className={baiJamjuree.className}>
        <span>
          <RiCalendarLine />
          <span>{date.day}</span>
        </span>
        <span>
          <RiTimeLine />
          <span>{date.time}</span>
        </span>
      </DateContainer>
    );
  } else {
    return <></>;
  }
}

function CancelButtonOrNothing({ type }: { type: "normal" | "cancel" }) {
  if (type === "cancel") {
    return <CancelButton>Cancelar</CancelButton>;
  } else {
    return <></>;
  }
}

export function SdcForm({
  type = "normal",
  date,
  sections,
  confirmType = "confirm",
  borderType = "static",
}: {
  type?: "normal" | "cancel";
  confirmType?: "next" | "confirm";
  borderType?: "static" | "gradient";
  date?: {
    day: string;
    time: string;
  };
  sections: { title: string; placeholder: string }[];
}) {
  return (
    <SdcFormContainer className={inter.className} borderType={borderType}>
      <DateOrNothing date={date}></DateOrNothing>
      {sections.map(section => (
        <InputContainer key={section.title}>
          <div>{section.title}</div>
          <input type="text" placeholder={section.placeholder} />
        </InputContainer>
      ))}
      <ButtonContainer type={type}>
        <CancelButtonOrNothing type={type} />
        <ConfirmButton>
          <span>{confirmType === "next" ? "Próximo Passo" : "Confirmar"}</span>
          {confirmType === "next" && <HiArrowRight />}
        </ConfirmButton>
      </ButtonContainer>
    </SdcFormContainer>
  );
}
