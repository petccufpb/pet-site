import { BGExtender } from "@app/components/ConhecaNos/styles";

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

export default async function Time() {
  const membersData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/team/members");
  const tutorsData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/team/tutors");

  return (
    <Content>
      <PhotoContainer>
        <ImgContainer>
          <Petrucio src={PetrucioFoto} alt="Petrucio" />
          <div>
            <TeamPhoto />
          </div>
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
        <MemberList type="tutor" data={await tutorsData.json()} />
        <MemberList type="members" data={await membersData.json()} />
      </div>
    </Content>
  );
}
