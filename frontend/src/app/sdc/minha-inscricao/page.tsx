"use client";
import React, { useRef, useState } from "react";
import { Title, Container, InputContainer, Message, LoaderContainer } from "./styles";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { SDCEventData } from "sdc";
import { SdcSchedule } from "../components/SdcSchedule";
import ActivityList from "./components/ActivityList";
import { SealIcon } from "@phosphor-icons/react";

// PARA TESTES
// async function getGuys() {
//   const test = await (
//     await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/projects/participants?editionId=b4c99a05-5b3b-4d22-b568-2ae1ed75cd06`,
//       { method: "GET" },
//     )
//   ).json();
//   return test;
// }

async function getAttendances(email: string) {
  const att: SDCEventData[] = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/participant/attendances?email=${email}&project=SDC`,
      {
        method: "GET",
      },
    )
  ).json();
  return att;
}

function MinhaInscricao() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [events, setEvents] = useState<SDCEventData[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [firstSubmitted, setFirstSubmitted] = useState(false);

  // PARA TESTES
  // window.setTimeout(async () => console.log(await getGuys()));

  return (
    <>
      <Title>Minhas Inscrições</Title>
      <Message>Digite seu email abaixo para encontrar todos os eventos no qual constou sua presença!</Message>
      {!submitted ? (
        <Container>
          <InputContainer>
            <div>Email</div>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              onInput={e => setEmail(e.currentTarget.value)}
              onChange={e => {
                if (e.currentTarget.validity.valid) setError(null);
                else setError("Digite um email válido.");
              }}
            />
            {error && <span>{error}</span>}
          </InputContainer>
          <button
            disabled={!!error || !email}
            onClick={async () => {
              setSubmitted(true);
              setFirstSubmitted(true);
              const att = await getAttendances(email);
              setEvents(att);
              setSubmitted(false);
            }}
          >
            <span>Conferir Participação</span>
            <CheckIcon width="16" />
          </button>
        </Container>
      ) : (
        <LoaderContainer>
          <SealIcon size={64} />
          <Message>
            <i>Procurando eventos para {email}…</i>
          </Message>
        </LoaderContainer>
      )}
      {!submitted && firstSubmitted && (
        <>
          {events.length != 0 ? (
            <ActivityList events={events} />
          ) : (
            <Message>
              <i>Nenhum evento encontrado…</i>
            </Message>
          )}
        </>
      )}
    </>
  );
}

export default MinhaInscricao;
