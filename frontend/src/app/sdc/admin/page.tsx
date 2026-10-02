"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSpeaker } from "backend";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import InputMask from "react-input-mask";
import { z } from "zod";

import api from "@services/api";

import { SpeakerForm } from "./components/SpeakerForm";
import {
  Area,
  AreaContainer,
  AreaOption,
  AreaSelector,
  Container,
  InputContainer,
  SelectButton,
  SelectionContainer,
  SendButton,
  SpeakerInfo,
  SpeakerItem,
  SpeakerList,
  SpeakerPhoto,
} from "./styles";

const sendFormSchema = z.object({
  edition: z.number().positive("O número da edição deve ser positivo").min(1),
  days: z.number().positive("A quantidade de dias deve ser positiva").min(10),
  startDate: z.date(),
  endDate: z.date(),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export default function AdminPage() {
  const [selectedArea, setSelectedArea] = useState(0);
  const [gameDay, setGameDay] = useState(false);
  const [speakers, setSpeakers] = useState<ProjectSpeaker[]>([]);
  const [speakersVersion, setSpeakersVersion] = useState(0);
  const [isLoadingSpeakers, setIsLoadingSpeakers] = useState(false);
  const [speakerListError, setSpeakerListError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
  });


  useEffect(() => {
    if (selectedArea !== 2) return;

    let isCurrent = true;
    setIsLoadingSpeakers(true);
    setSpeakerListError(false);

    api
      .get<ProjectSpeaker[]>("/projects/speakers")
      .then(({ data }) => {
        if (isCurrent) setSpeakers(data);
      })
      .catch(error => {
        console.error(error);
        if (isCurrent) setSpeakerListError(true);
      })
      .finally(() => {
        if (isCurrent) setIsLoadingSpeakers(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedArea, speakersVersion]);

  return (
    <Container>
      <h1>SDC: Área Administrativa</h1>
      <AreaSelector>
        <AreaOption onClick={() => setSelectedArea(0)} selected={selectedArea === 0}>
          Geral
        </AreaOption>
        <AreaOption onClick={() => setSelectedArea(1)} selected={selectedArea === 1}>
          Minicursos
        </AreaOption>
        <AreaOption onClick={() => setSelectedArea(2)} selected={selectedArea === 2}>
          Palestras
        </AreaOption>
      </AreaSelector>
      {selectedArea === 0 && (
        <AreaContainer>
          <Area>
            <InputContainer>
              <h3>Nº da Edição</h3>
              <InputMask mask="99" maskChar={null} {...register("edition")} />
              {errors.edition && <span>{errors.edition.message}</span>}
            </InputContainer>
            <InputContainer>
              <h3>Nº de Dias</h3>
              <InputMask mask="9" maskChar={null} {...register("days")} />
              {errors.days && <span>{errors.days.message}</span>}
            </InputContainer>
            <InputContainer>
              <h3>Contém Gameday?</h3>
              <SelectionContainer>
                <SelectButton onClick={() => setGameDay(true)} selected={gameDay}>
                  Sim
                </SelectButton>
                <SelectButton onClick={() => setGameDay(false)} selected={!gameDay}>
                  Não
                </SelectButton>
              </SelectionContainer>
            </InputContainer>
            <InputContainer>
              <h3>Data de Início</h3>
              <InputMask
                placeholder="dd-mm-yyyy"
                mask="99-99-9999"
                maskChar={null}
                {...register("startDate")}
              />
            </InputContainer>
            <InputContainer>
              <h3>Data de Término</h3>
              <InputMask
                placeholder="dd-mm-yyyy"
                mask="99-99-9999"
                maskChar={null}
                {...register("endDate")}
              />
            </InputContainer>
          </Area>
          <SendButton>
            <span>Cadastrar Evento</span>
            <HiOutlineCheckBadge size="1.1em" />
          </SendButton>
        </AreaContainer>
      )}
      {selectedArea === 1 && (
        <AreaContainer>
          <Area>Teste</Area>
        </AreaContainer>
      )}

      {selectedArea === 2 && (
        <AreaContainer>
          <SpeakerForm onCreated={() => setSpeakersVersion(version => version + 1)} />

          <section>
            <h2>Palestrantes cadastrados</h2>
            {isLoadingSpeakers ? (
              <p>Carregando palestrantes...</p>
            ) : speakerListError ? (
              <p role="alert">Não foi possível carregar a lista de palestrantes.</p>
            ) : speakers.length === 0 ? (
              <p>Nenhum palestrante cadastrado.</p>
            ) : (
              <SpeakerList>
                {speakers.map(speaker => (
                  <SpeakerItem key={speaker.id}>
                    <SpeakerPhoto>
                      {speaker.photoUrl ? <img src={speaker.photoUrl} alt="" /> : "Sem foto"}
                    </SpeakerPhoto>
                    <SpeakerInfo>
                      <h3>{speaker.name}</h3>
                      {speaker.about && <p>{speaker.about}</p>}
                    </SpeakerInfo>
                  </SpeakerItem>
                ))}
              </SpeakerList>
            )}
          </section>
        </AreaContainer>
      )}
    </Container>
  );
}
