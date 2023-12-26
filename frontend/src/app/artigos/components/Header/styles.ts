import styled, { keyframes } from "styled-components";

import headerBg from "@assets/images/headerBg.svg";

//animação petrucio flutuando
const toFloat = keyframes`
0%, 100%{
    transform: translateY(0px);
}
50%{
    transform: translateY(-10px);
}
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 18.5rem;
  background: url(${headerBg}) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 5rem;
    animation: ${toFloat} 3s ease-in-out infinite;
  }
`;
