"use client";

import FotoTime from "@assets/images/foto-time.jpg";
import PetrucioFoto from "@assets/images/petrucio-time.png";

import { MemberList } from "./components/MemberList";
import { PhotoBubble } from "./components/PhotoBubble";
import {
  Content,
  DescriptionContainer,
  ImgContainer,
  PETDescription,
  Petrucio,
  PhotoContainer,
  TeamPhoto,
} from "./styles";

export default function Time() {
  return (
    <Content>
      <PhotoContainer>
        <ImgContainer>
          <Petrucio src={PetrucioFoto} alt="Petrucio"></Petrucio>
          <TeamPhoto src={FotoTime} alt="Grupo PET Computação" />
        </ImgContainer>
        <DescriptionContainer>
          <PETDescription>
            <h2>Grupo PET Computação</h2>
            <div>Mais que um grupo, uma família</div>
          </PETDescription>
          <PhotoBubble />
        </DescriptionContainer>
      </PhotoContainer>
      <div>
        <MemberList type="tutor" />
        <MemberList type="members" />
      </div>
    </Content>
  );
}
