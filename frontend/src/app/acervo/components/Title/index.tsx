import { PiPlayFill } from "react-icons/pi";

import { Container } from "./styles";

const Title: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Container style={{ width: "4vw" }}>
        <PiPlayFill color="#fff" size="3vh" />
      </Container>

      <Container style={{ marginLeft: "-1.2vw" }}>
        <span>Acervo</span>
      </Container>
    </div>
  );
};

export default Title;
