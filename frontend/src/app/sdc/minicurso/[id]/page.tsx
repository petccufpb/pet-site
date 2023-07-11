import { formatInTimeZone } from "date-fns-tz";
import ptBR from "date-fns/locale/pt-BR";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Router, useRouter } from "next/router";
import { HiCheck } from "react-icons/hi2";
import { SDCEventData, SDCScheduleData } from "sdc";

import Logo from "@assets/images/logo.svg?svgr";
import Petrucio from "@assets/images/petrucio.svg?svgr";

import { MinicursoForm } from "../components/MinicursoForm";
import { DescriptionContainer, FormContainer, MinicursoContainer, SpeakerInfo } from "./styles";

export const metadata: Metadata = {
  title: "Plataforma | SDC - Minicurso",
};

export default async function Minicurso({ params }: { params: { id: string } }) {
  const schedule: SDCScheduleData = await (
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/editions/latest?project=SDC")
  ).json();

  const [event] = schedule.events.filter(({ id }: SDCEventData) => id === params.id);

  if (!event || event.type !== "minicurso") {
    notFound();
  }

  return (
    <MinicursoContainer>
      <DescriptionContainer>
        <span>
          <Petrucio alt="Logo PET Computação" width={120} height={66}></Petrucio>
          <Logo alt="Logo PET Computação" width={100} height={55}></Logo>
        </span>
        <h1>
          <div>Minicurso,</div>
          <div>correeeeee!</div>
        </h1>
        <h3>Corre, que as vagas nesse minicurso estão se esgotando.</h3>
        <button>
          <HiCheck />
          <span>Verificar Programação</span>
        </button>
      </DescriptionContainer>
      <FormContainer>
        <SpeakerInfo>
          <Image
            width={64}
            height={64}
            src={event.speaker.photoUrl}
            alt={"Palestrante " + event.speaker.name}
          ></Image>
          <h2>{event.speaker.name}</h2>
          <div>{event.name}</div>
        </SpeakerInfo>
        <MinicursoForm
          type="cancel"
          id={event.id}
          extrasAvailable={
            event.extraCapacity ? event.participants.length >= (event.capacity as number) : false
          }
          sections={[
            { title: "Seu nome", placeholder: "João da Silva", id: "name" },
            { title: "E-mail cadastrado", placeholder: "seuemail@exemplo.com", id: "email" },
          ]}
          date={{
            day: formatInTimeZone(new Date(event.startTime), "America/Fortaleza", "dd MMMM yyyy", {
              locale: ptBR,
            })
              .split(" ")
              .join(" de "),
            time: `${formatInTimeZone(new Date(event.startTime), "America/Fortaleza", "HH:mm")}h`,
          }}
          confirmType="confirm"
        />
      </FormContainer>
    </MinicursoContainer>
  );
}
