import { Member } from "backend";

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
    <Styling>
      <GroupPhoto />

      <MemberList type="tutors" data={tutors as Member[]} />

      <MemberList type="members" data={members as Member[]} />
    </Styling>
  );
}
