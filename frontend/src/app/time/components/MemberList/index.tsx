import { Link } from "@hyoretsu/react-components";
import { Member } from "backend";
import Image from "next/image";
import { CSSProperties } from "react";
import { FaGithubAlt, FaInstagram, FaLinkedin } from "react-icons/fa";

import { MemberDiv, Styling } from "./styles";

interface MemberListProps {
  data: Member[];
  style?: CSSProperties;
  type: "members" | "tutors";
}

const snsList = ["GitHub", "Instagram", "LinkedIn"];

export function MemberList({ data, style, type }: MemberListProps) {
  const titles = type === "members" ? ["Membros Ativos", "Membros Antigos"] : ["Tutores"];

  const activeMembers: Member[] = [];
  const inactiveMembers: Member[] = [];

  for (const member of data) {
    if (type === "members") {
      if (member.isActive) {
        activeMembers.push(member);
      } else {
        inactiveMembers.push(member);
      }
    }
  }

  return (
    <Styling id={type === "tutors" ? "tutores" : "membros"} style={style}>
      {titles.map((title, index) => (
        <section key={title}>
          <h2>{title}</h2>

          <div style={{ columnGap: type === "tutors" ? "6rem" : "8rem" }}>
            {(type === "members" ? (index === 0 ? activeMembers : inactiveMembers) : data).map(member => (
              <MemberDiv key={member.id}>
                <Image src={member.photoUrl || ""} alt={`Foto de ${member.name}`} fill />

                <div>
                  <div>
                    <span>{member.name.split(" ")[0]}</span>

                    {/* <span>Novo!</span> */}
                  </div>

                  <p>
                    {member.type === "founder"
                      ? "Fundador do PET.CC"
                      : member.type === "tutor"
                      ? "Tutor do PET.CC"
                      : member.isActive
                      ? "Membro Ativo"
                      : "Membro Antigo"}
                  </p>

                  <div>
                    {snsList.map(sns => {
                      let icon = null;
                      let url = "";

                      const memberSns = member.contactInfo.find(info => info.name === sns);

                      const snsId = memberSns?.snsId;
                      const color = snsId ? "#a8a8b3" : "#a8a8b35e";

                      if (sns === "GitHub") {
                        icon = <FaGithubAlt size={24} color={color} />;
                        url = `https://github.com/${snsId}`;
                      } else if (sns === "Instagram") {
                        icon = <FaInstagram size={24} color={color} />;
                        url = `https://instagram.com/${snsId}`;
                      } else if (sns === "LinkedIn") {
                        icon = <FaLinkedin size={24} color={color} />;
                        url = `https://linkedin.com/in/${snsId}`;
                      }

                      if (!memberSns) {
                        url = "";
                      }

                      return memberSns ? (
                        <Link key={sns} href={url}>
                          {icon}
                        </Link>
                      ) : (
                        icon
                      );
                    })}
                  </div>
                </div>
              </MemberDiv>
            ))}
          </div>
        </section>
      ))}
    </Styling>
  );
}
