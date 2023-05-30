"use client";

import { SdcForm } from "@app/sdc/components/SdcForm";
import { baiJamjuree, inter } from "@app/sdc/page";
import Image from "next/image";
import { HiCheck } from "react-icons/hi2";

import Bruck from "@assets/images/bruck.png";
import Logo from "@assets/images/logo.svg";
import Petrucio from "@assets/images/petrucio.svg";

import { DescriptionContainer, FormContainer, MinicursoContainer, SpeakerInfo } from "./styles";

export default function Minicurso() {
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
        <h3 className={baiJamjuree.className}>Corre, que as vagas nesse minicurso estão se esgotando.</h3>
        <button className={inter.className}>
          <HiCheck />
          <span>Verificar Programação</span>
        </button>
      </DescriptionContainer>
      <FormContainer>
        <SpeakerInfo>
          <Image src={Bruck} alt="Palestrante"></Image>
          <h2>Bruno Bruck</h2>
          <div className={baiJamjuree.className}>Como passar na cadeira de APA?</div>
        </SpeakerInfo>
        <SdcForm
          type="cancel"
          sections={[
            { title: "Seu nome", placeholder: "João da Silva" },
            { title: "E-mail cadastrado", placeholder: "seuemail@exemplo.com" },
          ]}
          date={{
            day: "17 de Julho de 2023",
            time: "8:00h",
          }}
          confirmType="confirm"
        />
      </FormContainer>
    </MinicursoContainer>
  );
}
