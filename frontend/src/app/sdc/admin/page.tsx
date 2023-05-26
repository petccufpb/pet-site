"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import InputMask from "react-input-mask";
import { z } from "zod";

import { baiJamjuree } from "../page";
import {
  Area,
  AreaContainer,
  AreaOption,
  AreaSelector,
  Container,
  Flex,
  InputContainer,
  SelectButton,
  SendButton,
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
  });

  return (
    <Container>
      <h1>SDC: Área Administrativa</h1>
      <AreaSelector style={baiJamjuree.style}>
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
              <InputMask mask="99" placeholder="00" maskChar={null} {...register("edition")} />
              {errors.edition && <span>{errors.edition.message}</span>}
            </InputContainer>
            <InputContainer>
              <h3>Nº de Dias</h3>
              <InputMask mask="9" placeholder="0" maskChar={null} {...register("days")} />
              {errors.days && <span>{errors.days.message}</span>}
            </InputContainer>
            <InputContainer>
              <h3>Contém Gameday?</h3>
              <Flex>
                <SelectButton onClick={() => setGameDay(true)} selected={gameDay}>
                  Sim
                </SelectButton>
                <SelectButton onClick={() => setGameDay(false)} selected={!gameDay}>
                  Não
                </SelectButton>
              </Flex>
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
    </Container>
  );
}
