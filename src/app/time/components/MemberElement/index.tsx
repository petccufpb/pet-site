import { Member } from "@prisma/client";
import { FaEnvelope, FaGithubAlt, FaInstagram } from "react-icons/fa";

import NoProfilePicture from "../../../assets/no-profile-picture.jpg";
import { MemberType } from "../MemberType";
import {
  Divider,
  Flex,
  MemberImage,
  MemberImageContainer,
  MemberInfo,
  MemberTypeContainer,
  QuestionMark,
  SocialMediaIcons,
} from "./styles";

export function MemberElement({ member, tutor }: { member: Member; tutor?: boolean }) {
  return (
    <Flex key={member.id}>
      <MemberImageContainer tutor={tutor}>
        <MemberImage
          src={member.photoUrl || "/images/no-profile-picture.svg"}
          width={80}
          height={80}
          alt={member.name}
        />
      </MemberImageContainer>
      <MemberInfo>
        <h3>{member.name}</h3>
        <MemberTypeContainer>
          <MemberType tutor={tutor} member={member} />
          <QuestionMark />
        </MemberTypeContainer>
        <Divider tutor={tutor} />
        <SocialMediaIcons tutor={tutor}>
          <FaGithubAlt size={20} />
          <FaEnvelope size={20} />
          <FaInstagram size={20} />
        </SocialMediaIcons>
      </MemberInfo>
    </Flex>
  );
}
