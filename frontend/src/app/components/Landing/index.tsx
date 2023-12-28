"use client";
import { Button, Flex, Text, Title } from "@app/styles";
import { RiArrowRightLine } from "react-icons/ri";

import Petrucio from "@assets/images/petrucio.svg?svgr";

export function Landing() {
  return (
    <Flex margin="8.5rem 0 5vh 0" w="min(100%,95vw)" h="40vh" align="start">
      <Flex w="100%" vertical gap="1.5rem" mobile={{ center: true, h: "100%", justify: "center" }}>
        <Text>Universidade Federal da Paraíba</Text>
        <Title level={3}>Bem-vindo ao Universo do PET</Title>
        <Text>Aqui você fica por dentro de tudo, e conhece mais um pouco de tudo que acontece no PET!</Text>
        <Button
          maxw="300px"
          flex
          gapanim
          mobileMx="auto"
          onClick={() =>
            window?.scrollTo({
              behavior: "smooth",
              top: document.getElementById("sobre")?.offsetTop,
            })
          }
        >
          <span>Conheça-nos</span>
          <RiArrowRightLine />
        </Button>
      </Flex>
      <Flex h="100%" align="center" w="100%" mobile={{ hide: true }}>
        {" "}
        <Petrucio height="400" style={{ transform: "translateX(5rem)" }} />
      </Flex>
    </Flex>
  );
}
