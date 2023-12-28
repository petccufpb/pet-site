import Image from "next/image";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaBolt } from "react-icons/fa6";
import {
  RiArrowRightLine,
  RiBook2Line,
  RiCodeSSlashFill,
  RiMegaphoneLine,
  RiSearch2Line,
} from "react-icons/ri";

import Apoio from "@assets/icons/apoio.svg?svgr";
import Recompensas from "@assets/icons/recompensas.svg?svgr";
import Grid from "@assets/images/grid.svg?svgr";
import HangLoose from "@assets/images/hangloose.svg?svgr";
import PetStamp from "@assets/images/pet-stamp.svg?svgr";
import PetrucioDuvidoso from "@assets/images/petrucio-duvidoso.svg?svgr";
import PIX from "@assets/images/pix.svg?svgr";
// @ts-expect-error
import Avaty from "@assets/images/sponsors/avaty.png";
// @ts-expect-error
import Synchro from "@assets/images/sponsors/synchro.png";
// @ts-expect-error
import TNS from "@assets/images/sponsors/tns.png";
import VSoft from "@assets/images/sponsors/vsoft.new.svg?svgr";

import { BackgroundContainer, GlowEllipse, SVGBackground } from "./components/Background/styles";
import Cards from "./components/Cards";
import { Landing } from "./components/Landing";
import { Button, CarouselFlex, Flex, HR, IgnorePageWidth, Text, Title, VL } from "./styles";

function Divider({ text }: { text?: string }) {
  return (
    <IgnorePageWidth w="100vw" top="85vh">
      {text ? (
        <Flex gap="1rem" align="center" style={{ transform: "translateY(-50%)" }}>
          <HR w="calc(50vw - 36rem)" />
          <Text nw weight={500} color="#ffffff99">
            {text}
          </Text>
          <HR />
        </Flex>
      ) : (
        <HR />
      )}
    </IgnorePageWidth>
  );
}

function CarouselItem() {
  return (
    <CarouselFlex gap="2rem" nw align="center" padding="0 0 0 2rem">
      <Flex bg="white" align="center" justify="center" square rounded="100%" w="8.5rem" h="8.5rem">
        <HangLoose />
      </Flex>
      <Text alt italic color="white" weight="700" size="8.5rem">
        Pet Computação
      </Text>
      <Flex margin="auto 0" bg="white" rounded="5rem" padding="0 3rem" align="center">
        <RiCodeSSlashFill size="8.5rem" color="black" />
      </Flex>
      <Flex square align="center" justify="center" bg="white" h="8.5rem" w="8.5rem">
        <AiFillThunderbolt size="6rem" color="black" />
      </Flex>
      <Text tight alt italic color="white" weight="700" size="8.5rem">
        Sempre impulsionando
      </Text>
    </CarouselFlex>
  );
}

const cardContents = [
  {
    title: "Extensão",
    description: [
      "Vamos além das salas de aula! A extensão é o ",
      " coração ",
      "do PET Computação, onde",
      " convergimos ",
      "tecnologia e sociedade. Nossos programas de extensão são projetados para criar impacto real, abordando desafios contemporâneos e",
      " promovendo ",
      "a inclusão digital.",
    ],
    icon: <RiMegaphoneLine />,
    bottomText: "+ 10 cursos",
  },
  {
    title: "Ensino",
    description: [
      "No PET Computação, o ensino vai além da transmissão de conhecimento. Estamos comprometidos em",
      " cultivar mentes inquisitivas e criativas ",
      "Nossas atividades de ensino visam inspirar a próxima geração de profissionais de computação,",
      " proporcionando ",
      "experiências práticas e mentorias personalizadas.",
    ],
    icon: <RiBook2Line />,
    bottomText: "+1200 pessoas",
  },
  {
    title: "Pesquisa",
    description: [
      "Mergulhamos nas águas da",
      " inovação ",
      "por meio da pesquisa. Com projetos que desafiam limites e exploram",
      " novas fronteiras digitais ",
      "nossos membros estão dedicados a",
      " impulsionar ",
      "o conhecimento na área da computação.",
    ],
    icon: <RiSearch2Line />,
    bottomText: "+45 pesquisas",
  },
];

export const metadata = {
  description:
    "O Programa de Educação Tutorial (PET) Ciência da Computação da Universidade Federal da Paraíba é um grupo que tem como pilares: Ensino, Pesquisa e Extensão.",
};

export default function Home() {
  return (
    <>
      <BackgroundContainer>
        <SVGBackground xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gradient">
              <stop offset="0%" stopColor="#0072ed" />
              <stop offset="90%" stopColor="#0072ed20" />
              <stop offset="100%" stopColor="#00000000" />
            </radialGradient>
          </defs>
          <g fill="url(#gradient)">
            <GlowEllipse fill="url(#gradient)" cx="175px" cy="450px" rx="650" ry="650" />
            <GlowEllipse fill="url(#gradient)" cx="95%" cy="600px" rx="650" ry="650" />
            <g opacity="0.9">
              <GlowEllipse fill="url(#gradient)" cx="0" cy="1500px" rx="650" ry="650" />
            </g>
            <GlowEllipse fill="url(#gradient)" cx="50%" cy="105%" rx="900" ry="650" />
            <g opacity="0.55">
              <GlowEllipse fill="url(#gradient)" cx="90%" cy="2300px" rx="900" ry="650" />
            </g>
          </g>
        </SVGBackground>
      </BackgroundContainer>

      <Landing />

      <Flex w="100%" h="12.5rem" align="center">
        <Divider text="Parcerias Consolidadas" />
      </Flex>
      <Flex vertical gap="3rem" align="center" w="min(100%,95vw)">
        <Flex w="100%" gap="1rem" maxw="600px" wrap align="center" justify="space-evenly" center>
          <VSoft />
          <Image unoptimized src={Synchro} alt="Synchro" />
          <Image unoptimized src={TNS} alt="TNS" />
          <Image unoptimized src={Avaty} alt="Avaty" />
        </Flex>
        <Text center alt color="#ffffff4d" weight={600} w="100%" maxw="375px">
          Esses são os responsáveis por dar assistência, introduzindo os estudantes no mercado!
        </Text>
      </Flex>
      <Flex w="min(100%,95vw)" justify="space-between" relative padding="5rem 0 0 0" reverse>
        <PetStamp opacity="0.25" style={{ position: "absolute", left: "-17.25%", top: "12.5%" }} />
        <Cards items={cardContents} />
        <Flex gap="0.5rem" maxw="470px" w="100%" vertical justify="center" align="end">
          <Text w="100%" alt color="#0072ed99" weight="700" size="1rem">
            Pesquisa, Ensino e Extensão
          </Text>
          <Text margin="0 0 1rem 0" size="3rem" color="#e1e1e6" alt weight="700">
            Todas as nossas vertentes...
          </Text>
          <Text loose color="#999a9b" w="100%">
            Explore as oportunidades no PET Computação da UFPB, onde nosso constante desejo de crescimento se
            conecta aos fundamentos da universidade: ensino, pesquisa e extensão. Somos um grupo comprometido
            com uma formação integral, combinada a inovação e a responsabilidade social para criar uma
            experiência única.
          </Text>
        </Flex>
      </Flex>
      <Flex id="sobre" w="min(100%,95vw)" justify="space-between" wrap gap="3rem">
        <Flex gap="0.5rem" maxw="470px" w="100%" vertical justify="center" align="end">
          <Text w="100%" alt color="#0072ed99" weight="700" size="1rem">
            Mas, o que seria o PET ?
          </Text>
          <Text margin="0 0 1rem 0" size="3rem" color="#e1e1e6" alt weight="700">
            Conheça um pouco sobre o PET
          </Text>
          <Text loose color="#999a9b">
            O Programa de Educação Tutorial do Bacharelado de Ciência da Computação da UFPB não é apenas um
            grupo acadêmico, é uma verdadeira família. Buscamos não apenas promover o crescimento acadêmico,
            mas também celebrar a individualidade de cada membro.O PET Computação é um espaço de aprendizado,
            apoio mútuo e desenvolvimento pessoal.
          </Text>
        </Flex>
        <Grid
          style={{
            position: "absolute",
            right: "-5rem",
            transform: "translateY(-5rem)",
            opacity: "0.65",
          }}
        />
        <PetrucioDuvidoso style={{ zIndex: "90" }} />
      </Flex>
      <Flex align="center" h="27.5rem">
        <IgnorePageWidth w="100vw">
          <Flex gap="0">
            <CarouselItem />
            <CarouselItem />
            <CarouselItem />
          </Flex>
        </IgnorePageWidth>
      </Flex>
      <Flex w="min(100%,93vw)" bg="#0072ed1a" margin="2rem 0 0" wrap>
        <Flex
          stretch
          vertical
          gap="2rem"
          align="center"
          justify="center"
          padding="3rem"
          br="1px solid white"
          mobile={{ br: "none" }}
        >
          <Flex
            margin="2rem 0 0.5rem 0"
            rounded="1.5rem"
            gap="1rem"
            bg="#1A1A1A"
            padding="0.75rem 1.5rem"
            align="center"
          >
            <FaBolt color="#0072ED" />
            <Text color="white" alt weight="700">
              Faça sua contribuição
            </Text>
          </Flex>
          <Title level={2} w="100%" maxw="530px" center>
            Dê o primeiro passo e torne-se um dos contribuintes do PET.{" "}
          </Title>
          <Text center maxw="555px" w="100%" loose color="#ffffff99" margin="0.5rem 0 0 0">
            Estamos comprometidos com a constante melhoria de nossas atividades. Valorizamos cada pequena
            contribuição, pois compreendemos que é através desses esforços coletivos que alcançamos a
            excelência
          </Text>
          <Button flex maxw="300px" alt gapanim>
            <span>Fazer Contribuição</span>
            <RiArrowRightLine />
          </Button>
          <Flex gap="1.5rem" align="center">
            <Flex align="center" gap="1rem">
              <PIX height="36px" width="auto" />
              <Text weight="700" bg="#0072ED" color="white" rounded="1rem" alt padding="0.25rem 1rem">
                Novo!
              </Text>
            </Flex>
            <VL />
            <Text alt color="#AFAFAF" weight="700">
              Para fins INSTITUCIONAIS
            </Text>
          </Flex>
        </Flex>
        <Flex vertical w="350px" mobile={{ w: "100%" }}>
          <Flex
            padding="3rem"
            bb="1px solid white"
            h="100%"
            vertical
            gap="1rem"
            w="100%"
            justify="center"
            mobile={{ bb: "none", bt: "1px solid white" }}
          >
            <Apoio />
            <Text color="white" alt weight="700" size="1.25rem">
              Seu apoio
            </Text>
            <Text>A sua contribuição nos ajuda a manter o nosso laboratório e máquinas.</Text>
          </Flex>
          <Flex
            h="100%"
            padding="3rem"
            vertical
            gap="1rem"
            w="100%"
            justify="center"
            mobile={{ bt: "1px solid white" }}
          >
            <Recompensas />
            <Text color="white" alt weight="700" size="1.25rem">
              Recompensas
            </Text>
            <Text>Somos eternamente gratos! Seu nome irá aparecer em nossas publicações.</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
