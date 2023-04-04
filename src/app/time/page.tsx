"use client";

import { Lexend } from "next/font/google";

import { MembersContainer } from "./components/MembersContainer";
import { TutorsContainer } from "./components/TutorsContainer";
import { SectionTitle } from "./styles";

const lexend = Lexend({ subsets: ["latin"] });

export default function Time() {
  return (
    <div className={lexend.className}>
      <SectionTitle>Tutores</SectionTitle>
      <TutorsContainer />
      <SectionTitle>Membros Ativos</SectionTitle>
      <MembersContainer />
    </div>
  );
}
