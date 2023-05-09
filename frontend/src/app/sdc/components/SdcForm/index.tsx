"use client";

import { inter } from "@app/sdc/page";
import { HiArrowRight } from "react-icons/hi2";

import { InputContainer, SdcFormContainer } from "./styles";

export function SdcForm() {
  return (
    <SdcFormContainer className={inter.className}>
      <InputContainer>
        <div>Matrícula</div>
        <input type="text" placeholder="20210000000" />
      </InputContainer>
      <InputContainer>
        <div>Nome completo</div>
        <input type="text" placeholder="João da Silva" />
      </InputContainer>
      <button>
        <span>Próximo Passo</span>
        <HiArrowRight />
      </button>
    </SdcFormContainer>
  );
}
