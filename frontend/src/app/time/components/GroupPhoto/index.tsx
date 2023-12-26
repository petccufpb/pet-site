"use client";
import Image from "next/image";

import { useWindow } from "@hooks/useWindow";

import WhoWeAre from "./components/WhoWeAre";
import { Styling } from "./styles";

const GroupPhoto: React.FC = () => {
  const { innerWidth } = useWindow();

  return (
    <div id="who-we-are">
      <Styling>
        <Image src="/images/foto-time.jpg" alt="Foto do grupo" width={1440} height={756} />

        {innerWidth > 480 && <WhoWeAre />}
      </Styling>

      {innerWidth <= 480 && <WhoWeAre />}
    </div>
  );
};

export default GroupPhoto;
