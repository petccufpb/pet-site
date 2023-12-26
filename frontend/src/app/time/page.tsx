import { GlowingBlur } from "@hyoretsu/react-components";
import { Member } from "backend";

import BlurGroup from "@components/BlurGroup";

import GroupPhoto from "./components/GroupPhoto";
import { MemberList } from "./components/MemberList";
import { Styling } from "./styles";

export const metadata = {
  title: "Time | PET Computação",
  description: "Time do PET Computação",
};

export default async function Time() {
  const membersRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/team/members");
  const members = await membersRes.json();

  const tutorsRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/team/tutors");
  const tutors = await tutorsRes.json();

  return (
    <>
      <BlurGroup relativeTo="time">
        <GlowingBlur color="#0072ed" radius="40rem" position={["-30%", "-15%"]} opacity={0.6} />

        <GlowingBlur
          color="#0072ed"
          radius="40rem"
          position={["-35%", "40%"]}
          invertPositions={[true, false]}
          opacity={0.6}
        />

        <GlowingBlur
          id="glow3"
          color="#0072ed"
          radius="40rem"
          position={["15%", "-45%"]}
          invertPositions={[false, true]}
          opacity={0.5}
        />
      </BlurGroup>

      <Styling>
        <GroupPhoto />

        <div id="time">
          <MemberList type="tutors" data={tutors as Member[]} style={{ marginTop: "3.5rem" }} />

          <MemberList type="members" data={members as Member[]} style={{ marginTop: "7.75rem" }} />
        </div>
      </Styling>
    </>
  );
}
