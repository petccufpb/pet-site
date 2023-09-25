import { Metadata } from "next";

import CodeTogether from "@public/images/code-together.svg?svgr";
import CPU from "@public/images/cpu.svg?svgr";
import Flask from "@public/images/flask.svg?svgr";
import Podcast from "@public/images/podcast.svg?svgr";

import { Card, CardContainer, Container, Description, PageTitle, Title } from "./styles";

export const metadata: Metadata = {
  title: "PET Computação - Projetos",
  description: "Todos esses projetos impulsionam a extensão de todo o conteúdo que oferecemos.",
};

export default function Projetos() {
  return (
    <Container>
      <PageTitle>
        <h1>Projetos</h1>
        <span>Todos esses projetos impulsionam a extensão de todo o conteúdo que oferecemos.</span>
      </PageTitle>
      <CardContainer>
        <Card>
          <Title>
            <CodeTogether />
            <h3>Code Together</h3>
          </Title>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Description>
        </Card>
        <Card>
          <Title>
            <CPU />
            <h3>CPU</h3>
          </Title>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Description>
        </Card>
        <Card>
          <Title>
            <Flask />
            <h3>Laboratório de Introdução a Programação</h3>
          </Title>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Description>
        </Card>
        <Card>
          <Title>
            <Podcast />
            <h3>Podcast</h3>
          </Title>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Description>
        </Card>
      </CardContainer>
    </Container>
  );
}
