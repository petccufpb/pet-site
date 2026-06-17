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

function formatMemberName(fullName: string): string {
  if (!fullName) return "";

  // Remove parênteses e colchetes com conteúdo (ex: "(Tutor)", "[PET]")
  const withoutAnnotations = fullName.replace(/\([^)]*\)/g, "").replace(/\[[^\]]*\]/g, "");

  // Trata símbolos especiais: remove caracteres indesejados, preservando letras (com acentos), hífens, apóstrofos e espaços
  const cleaned = withoutAnnotations
    .replace(/[^a-zA-ZáàâãéèêíïóòôõúçñÁÀÂÃÉÈÊÍÏÓÒÔÕÚÇÑ\s'-]/g, "")
    .trim()
    .replace(/\s+/g, " ");

  const words = cleaned.split(" ");
  if (words.length === 0 || words[0] === "") return "";

  const [firstName] = words;
  if (words.length === 1) return firstName;

  const prepositions = ["de", "da", "do", "dos", "das", "e", "di", "del"];

  // Encontra a primeira palavra a partir do índice 1 que não seja uma preposição
  let firstSurnameIdx = -1;
  for (let i = 1; i < words.length; i++) {
    if (!prepositions.includes(words[i].toLowerCase())) {
      firstSurnameIdx = i;
      break;
    }
  }

  // Se não encontrou um sobrenome válido
  if (firstSurnameIdx === -1) {
    return words.join(" ");
  }

  // Verifica se há uma preposição imediatamente anterior a esse primeiro sobrenome
  const hasPrepositionBefore =
    firstSurnameIdx > 1 && prepositions.includes(words[firstSurnameIdx - 1].toLowerCase());

  if (hasPrepositionBefore) {
    const preposition = words[firstSurnameIdx - 1];
    const surname = words[firstSurnameIdx];
    return `${firstName} ${preposition} ${surname}`;
  }

  const surname = words[firstSurnameIdx];
  return `${firstName} ${surname}`;
}

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

          <div>
            {(type === "members" ? (index === 0 ? activeMembers : inactiveMembers) : data).map(member => (
              <MemberDiv key={member.id}>
                <Image src={member.photoUrl || ""} alt={`Foto de ${member.name}`} fill />

                <div>
                  <div>
                    <span>{formatMemberName(member.name)}</span>

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

                      if (sns === "GitHub") {
                        icon = <FaGithubAlt size={24} />;
                        url = `https://github.com/${snsId}`;
                      } else if (sns === "Instagram") {
                        icon = <FaInstagram size={24} />;
                        url = `https://instagram.com/${snsId}`;
                      } else if (sns === "LinkedIn") {
                        icon = <FaLinkedin size={24} />;
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
