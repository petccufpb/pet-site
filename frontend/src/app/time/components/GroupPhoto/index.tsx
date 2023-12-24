"use client";
import Image from "next/image";

import WhoWeAre from "./components/WhoWeAre";
import { Styling } from "./styles";

const GroupPhoto: React.FC = () => {
  return (
    <div id="who-we-are">
      <Styling>
        <Image src="/images/foto-time.jpg" alt="Foto do grupo" width={1440} height={756} />

        {typeof window !== "undefined" && window.innerWidth > 480 && <WhoWeAre />}
      </Styling>

      {typeof window !== "undefined" && window.innerWidth <= 480 && <WhoWeAre />}
    </div>
  );
};

export default GroupPhoto;
