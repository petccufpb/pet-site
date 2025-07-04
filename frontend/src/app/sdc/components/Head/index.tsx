import { SectionTitle } from "@app/sdc/styles";
import parse from "html-react-parser";
import { FaInstagram } from "react-icons/fa";
import { SDCScheduleData } from "sdc";

import { FireHexagon } from "../Hexagon";
import {
	Description,
	HeadContainer,
	InstagramContainer,
	MoreInfo,
	Section,
	SmallTitle,
	SubscribeButton,
} from "./styles";

interface HeadProps {
  data: SDCScheduleData;
}

export async function Head({ data: { logoUrl, name } }: HeadProps) {
  const participantsRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/editions?project=SDC");
  const participants = (await participantsRes.json())[1].participants.length;

  let logo = "";
  if (logoUrl) {
    const logoRes = await fetch(logoUrl);
    logo = await logoRes.text();
  }

  return (
    <HeadContainer>
      <Section>
        {logo.includes("<svg") ? parse(logo) : <img src={logoUrl} alt={`Logo da ${name}`} />}

        <div>
          <SmallTitle>Última Edição</SmallTitle>

          <div>
            <FireHexagon></FireHexagon>
            <span>
              +{Math.floor(participants / 10) * 10} INSCRITO{participants === 1 ? "" : "S"}
            </span>
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle>SOBRE</SectionTitle>
        <div>
          <Description>
            Todo semestre o PET Computação (Programa de Educação Tutorial) realiza a Semana da Computação, que
            acontece junto com a entrada de novos estudantes na universidade. A Semana é dedicada para todos
            os profissionais da área de TI e ainda dá as boas-vindas aos novos estudantes dos cursos. A
            programação contempla palestras da área de computação, empreendedorismo, minicursos, workshops,
            jogos, mesas redondas e mais.
          </Description>
          <MoreInfo>
            <div>
              <SmallTitle>Mais informações</SmallTitle>
              <InstagramContainer
                aria-label="Instagram PET Computação"
                href="https://www.instagram.com/petccufpb/"
              >
                <FaInstagram size={20}></FaInstagram>
                <span>@petccufpb</span>
              </InstagramContainer>
            </div>
            <SubscribeButton aria-label="Inscrição" href="/sdc/inscricao">
              GARANTIR MINHA VAGA
            </SubscribeButton>
          </MoreInfo>
        </div>
      </Section>
    </HeadContainer>
  );
}
