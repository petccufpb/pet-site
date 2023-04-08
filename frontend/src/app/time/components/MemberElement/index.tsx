import { Member } from "backend";
import { FaEnvelope, FaGithubAlt, FaInstagram, FaQuestionCircle } from "react-icons/fa";

import defaultTheme from "@styles/theme/default";

import { MemberType } from "../MemberType";
import { SocialMediaLink } from "../SocialMediaLink";
import {
  Divider,
  Content,
  MemberImage,
  MemberImageBorder,
  MemberInfo,
  MemberTypeContainer,
  QuestionMark,
  SocialMediaIcons,
} from "./styles";

export interface MemberColorTheme {
  color: string;
  gradient: string;
}

export function MemberElement({ member, tutor }: { member: Member; tutor?: boolean }) {
  let colorTheme: MemberColorTheme;

  console.log(member);

  if (tutor) {
    colorTheme = {
      color: defaultTheme.colors["third-blue"],
      gradient: defaultTheme.colors["gradient-blue"],
    };
  } else if (member.isActive) {
    colorTheme = {
      color: defaultTheme.colors["base-green"],
      gradient: defaultTheme.colors["gradient-green"],
    };
  } else {
    colorTheme = {
      color: defaultTheme.colors["base-red"],
      gradient: defaultTheme.colors["gradient-red"],
    };
  }

  return (
    <Content key={member.id}>
      <div>
        <MemberImageBorder colorTheme={colorTheme}>
          <MemberImage
            src={member.photoUrl || "/images/no-profile-picture.svg"}
            width={80}
            height={80}
            alt={member.name}
          />
        </MemberImageBorder>
      </div>
      <MemberInfo>
        <h3>{member.name}</h3>
        <MemberTypeContainer>
          <MemberType tutor={tutor} member={member} />
          <QuestionMark>
            <FaQuestionCircle />
            <small>{member.about}</small>
          </QuestionMark>
        </MemberTypeContainer>
        <Divider colorTheme={colorTheme} />
        <SocialMediaIcons colorTheme={colorTheme}>
          {/*
            O código comentado abaixo deve ser usado quando tivermos os dados de contato de todos os
            membros, o que está sendo atualmente serve apenas para decoração, já que mostra os ícones de
            todas as redes sociais, até as que não se tem informação sobre.
          */}
          {/* {member.contactInfo?.map(c => (
            <SocialMediaLink contactInfo={c} key={c.id} />
          ))} */}
          <a href="">
            <FaGithubAlt size={20} />
          </a>
          <a href="">
            <FaEnvelope size={20} />
          </a>
          <a href="">
            <FaInstagram size={20} />
          </a>
        </SocialMediaIcons>
      </MemberInfo>
    </Content>
  );
}
