import { baiJamjuree, inter } from "@app/sdc/page";
import { Section, SectionTitle, Title } from "@app/sdc/styles";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

import LastEditionLogo from "@assets/images/sdc.png";

import { FireHexagon } from "../Hexagon";
import {
  Description,
  HeadContainer,
  InstagramContainer,
  JustifyBetween,
  LastEditionSection,
  MoreInfo,
  SubscribeButton,
  SubscribeCount,
} from "./styles";

export function Head() {
  return (
    <HeadContainer className={baiJamjuree.className}>
      <LastEditionSection>
        <SectionTitle>ULTIMA EDIÇÃO</SectionTitle>
        <div>
          <Image alt="Logo da SDC XXIX" src={LastEditionLogo} width="360" priority={true}></Image>
          <SubscribeCount>
            <FireHexagon></FireHexagon>
            <div>+450 INSCRITOS</div>
          </SubscribeCount>
        </div>
      </LastEditionSection>
      <Section>
        <SectionTitle>SOBRE</SectionTitle>
        <JustifyBetween>
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
            <SubscribeButton className={baiJamjuree.className}>
              <Link href="sdc/inscricao">GARANTIR MINHA VAGA</Link>
            </SubscribeButton>
          </MoreInfo>
        </JustifyBetween>
      </Section>
    </HeadContainer>
  );
}
