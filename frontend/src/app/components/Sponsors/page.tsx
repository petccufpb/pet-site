import { FaCode } from "react-icons/fa6";

import { Container, Contribute, Divisor, SponsorsContainer } from "./styles";

export default function Sponsors() {
  return (
    <Container>
      <h1>
        Empresas que são
        <br />
        parceiras
      </h1>
      <div>
        Esses são os responsáveis por dar assistência
        <br />
        introduzindo os estudantes no mercado
      </div>
      <SponsorsContainer>
        <img src="/images/sponsors/vsoft.svg" alt="VSoft" />
        <Divisor />
        <img src="/images/sponsors/synchro.svg" alt="Synchro" />
        <Divisor />
        <img src="/images/sponsors/ci.svg" alt="Centro de Informática da UFPB" />
        <Divisor />
        <img src="/images/sponsors/ufpb.svg" alt="Universidade Federal da Paraíba" />
      </SponsorsContainer>
      <Contribute>
        {/* a rectangular svg of full width, with 7 circles, one 100px larger then the previous, all of which will have
        its center at 5rem right of the right border of the parent */}
        {/* every circle has a different color */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          textAnchor="end"
        >
          <ellipse cy="50%" rx="19rem" ry="19rem" fill="#2e6e7e" />
          <ellipse cy="50%" rx="15rem" ry="15rem" fill="#388ba0" />
          <ellipse cy="50%" rx="11rem" ry="11rem" fill="#3e9ab1" />
          <ellipse cy="50%" rx="7rem" ry="7rem" fill="#45aac5" />
          <ellipse cy="50%" rx="5rem" ry="5rem" fill="#49b7d3" />
          <ellipse cy="50%" rx="3rem" ry="3rem" fill="#4ec5e3" />
        </svg>
        <div>
          <FaCode size="1.5em" />
          <span>Contribuir</span>
        </div>
      </Contribute>
    </Container>
  );
}
