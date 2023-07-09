import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaShieldAlt } from "react-icons/fa";
import { SDCEventData, SDCScheduleData } from "sdc";

import Logo from "@assets/images/logo.svg?svgr";
import Petrucio from "@assets/images/petrucio.svg?svgr";

import { FrequenciaForm } from "../components/FrequenciaForm";
import {
  DescriptionContainer,
  FormContainer,
  LocationWarning,
  FrequenciaContainer,
  SpeakerInfo,
} from "./styles";

export const metadata: Metadata = {
  title: "Plataforma | SDC - Frequência",
};

export default async function Frequencia({ params }: { params: { id: string } }) {
  const schedule: SDCScheduleData = await (
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/editions/latest?project=SDC")
  ).json();

  const [event] = schedule.events.filter(({ id }: SDCEventData) => id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <FrequenciaContainer>
      <DescriptionContainer>
        <span>
          <Petrucio alt="Logo PET Computação" width={120} height={66}></Petrucio>
          <Logo alt="Logo PET Computação" width={100} height={55}></Logo>
        </span>
        <h1>
          <div>Frequência</div>
        </h1>
        <h3>
          É preciso realizar a frequência para garantir o seu certificado ao final da Semana. É necessário
          estar dentro do Centro de Informática para comprovar sua participação na atividade.
        </h3>
        <LocationWarning>
          <FaShieldAlt height="2em"></FaShieldAlt>
          <span>Permita compartilhar sua localização</span>
        </LocationWarning>
      </DescriptionContainer>
      <FormContainer>
        <SpeakerInfo>
          <Image width={64} height={64} src={event.speaker.photoUrl} alt="Palestrante"></Image>
          <h2>{event.speaker.name}</h2>
          <div>{event.name}</div>
        </SpeakerInfo>
        <FrequenciaForm
          type="cancel"
          id={event.id}
          sections={[
            { title: "Seu nome", placeholder: "João da Silva", id: "name" },
            { title: "E-mail cadastrado", placeholder: "seuemail@exemplo.com", id: "email" },
          ]}
          date={{
            day: new Date(event.startTime).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            time:
              new Date(event.startTime).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              }) + "h",
          }}
          endTime={new Date(event.endTime)}
          confirmType="confirm"
        />
      </FormContainer>
    </FrequenciaContainer>
  );
}
