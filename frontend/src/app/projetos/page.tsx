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
            <h3>Criação de Vídeos</h3>
          </Title>
          <Description>
            O Code Together é uma atividade do PET Computação focada em ensinar elementos de programação
            básica em diversas linguagens de programação e fazer um acompanhamento do aprendizado dos alunos
            desde níveis mais básicos até niveis avançados em tecnologias e linguagens de programação que não
            são comumente ensinadas no curso de Ciência da Computação da UFPB, como por exemplo Go e React
            Native, expandindo assim o conhecimento dos alunos sobre a área de computação e ajudando-os a
            encontrar suas áreas de interesse e construir uma carreira produtiva e proveitosa.
          </Description>
        </Card>
        <Card>
          <Title>
            <CPU />
            <h3>CPU</h3>
          </Title>
          <Description>
            O Curso de Programação para Universitários (CPU) é uma atividade do grupo PET Computação focada em
            ensinar elementos de programação básica para alunos de graduação de cursos fora da área da
            tecnologia através de videoaulas síncronas e assíncronas, junto de atividades de fixação, buscando
            assim ampliar o conhecimento dos alunos sobre a área de computação e ajudá-los a aplicar os
            conhecimentos adquiridos em suas respectivas áreas de atuação.
          </Description>
        </Card>
        <Card>
          <Title>
            <Flask />
            <h3>Laboratório de Introdução a Programação</h3>
          </Title>
          <Description>
            O Laboratório de Introdução a Programação é uma atividade do PET Computação focada em auxiliar os
            alunos dos primeiros períodos do curso de Ciência da Computação da UFPB nas cadeiras introdutórias
            de programação, com aulas de monitoria e resolução de listas de exercícios, fornecendo assim um
            suporte maior para os novos alunos do curso. Todo o conteúdo e suporte do laboratório também é
            fornecido aos alunos do CPU, para que eles também possam ter um suporte maior em suas atividades.
          </Description>
        </Card>
        <Card>
          <Title>
            <Podcast />
            <h3>Podcast</h3>
          </Title>
          <Description>
            O Podcast Além do Ponto e Vírgula é uma atividade do PET Computação focada em discutir assuntos
            relacionados a computação e tecnologia de forma descontraída, com o objetivo de levar o
            conhecimento de forma mais leve e divertida para os ouvintes. O podcast é gravado frequentemente e
            disponibilizado em plataformas de streaming de áudio como Spotify. Diversos especialistas em
            diferentes áreas da computação já participaram do podcast, trazendo assim um conteúdo mais
            diversificado e rico para os ouvintes.
          </Description>
        </Card>
      </CardContainer>
    </Container>
  );
}
