"use client";

import FotoTime from "../../assets/foto-time.jpg";

import { MemberList } from "./components/MemberList";
import { PhotoBubble } from "./components/PhotoBubble";
import { Content, DescriptionContainer, PETDescription, PhotoContainer, TeamPhoto } from "./styles";

export default function Time() {
  return (
    <Content>
      <PhotoContainer>
        <TeamPhoto src={FotoTime} alt="Grupo PET Computação" />
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
