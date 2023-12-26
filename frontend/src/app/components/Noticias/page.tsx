import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { NoticiaEmDestaque, NoticiasContainer, Noticia, Container, Pagination } from "./styles";

export default function Noticias() {
  return (
    <Container>
      <h1>Últimas Notícias</h1>
      <NoticiasContainer>
        <NoticiaEmDestaque />
        <Noticia />
        <Noticia />
        <Noticia />
        <Noticia />
      </NoticiasContainer>
      <Pagination>
        <FaArrowLeft />
        <span>página 2 de 3</span>
        <FaArrowRight />
      </Pagination>
    </Container>
  );
}
