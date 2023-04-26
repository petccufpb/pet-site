"use client";

import { Bai_Jamjuree, Inter } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";

import LastEditionLogo from "@assets/sdc.png";

import { FireHexagon } from "./components/Hexagon";
import {
  Background,
  CountDown,
  Description,
  Divider,
  Head,
  InstagramContainer,
  LastEditionSection,
  MoreInfo,
  Section,
  SectionTitle,
  SubscribeButton,
  SubscribeCount,
  TimeUnit,
  Timer,
  Title,
} from "./styles";

const baiJamjuree = Bai_Jamjuree({ subsets: ["latin"], weight: ["500", "400", "300", "200"] });
const inter = Inter({ subsets: ["latin"], weight: ["500"] });

export default function SDC() {
  const countDownDate = new Date("Jan 5, 2024 08:30:00").getTime();

  function countTime() {
    const now = new Date().getTime();

    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        done: true,
      };
    }

    return {
      days,
      hours,
      minutes,
      seconds,
      done: false,
    };
  }

  const [timeRemaining, setTimeRemaining] = useState(countTime());

  const x = setInterval(() => {
    const time = countTime();
    setTimeRemaining(countTime());

    if (time.done) {
      clearInterval(x);
    }
  }, 1000);

  return (
    <div>
      <Background>
        <svg>
          <circle r="20rem" fill="#0072ED"></circle>
        </svg>
        <svg>
          <circle r="20rem" fill="#0072ED"></circle>
        </svg>
      </Background>
      <Head className={baiJamjuree.className}>
        <LastEditionSection>
          <SectionTitle>ULTIMA EDIÇÃO</SectionTitle>
          <Image alt="Logo da SDC XXIX" src={LastEditionLogo} width="360"></Image>
          <SubscribeCount>
            <FireHexagon></FireHexagon>
            <div>+450 INSCRITOS</div>
          </SubscribeCount>
        </LastEditionSection>
        <Section>
          <SectionTitle>SOBRE</SectionTitle>
          <Description className={inter.className}>
            Todo semestre o PET Computação (Programa de Educação Tutorial) realiza a Semana da Computação, que
            acontece junto com a entrada de novos estudantes na universidade. A Semana é dedicada para todos
            os profissionais da área de TI e ainda dá as boas-vindas aos novos estudantes dos cursos. A
            programação contempla palestras da área de computação, empreendedorismo, minicursos, workshops,
            jogos, mesas redondas e mais.
          </Description>
          <MoreInfo>
            <div>
              <Title>MAIS INFORMAÇÕES</Title>
              <InstagramContainer>
                <FaInstagram size={20}></FaInstagram>
                <div>@petccufpb</div>
              </InstagramContainer>
            </div>
            <SubscribeButton className={baiJamjuree.className}>GARANTIR MINHA VAGA</SubscribeButton>
          </MoreInfo>
        </Section>
      </Head>
      <CountDown>
        <Timer>
          <div>
            O EVENTO
            <br />
            COMEÇA EM
          </div>
          <Divider />
          <TimeUnit>
            <h3>{timeRemaining.days}</h3>
            <span>DIAS</span>
          </TimeUnit>
          <TimeUnit>
            <h3>{timeRemaining.hours}</h3>
            <span>HOR</span>
          </TimeUnit>
          <TimeUnit>
            <h3>{timeRemaining.minutes}</h3>
            <span>MIN</span>
          </TimeUnit>
          <TimeUnit>
            <h3>{timeRemaining.seconds}</h3>
            <span>SEG</span>
          </TimeUnit>
        </Timer>
        <span>
          THIS IS A<br />
          WATER SPLITTER
        </span>
      </CountDown>
    </div>
  );
}
