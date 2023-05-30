import { Bai_Jamjuree, Inter } from "next/font/google";
import { BsFillMegaphoneFill } from "react-icons/bs";

import { Countdown } from "./components/Countdown";
import { FeatureList } from "./components/FeaturesList";
import { Head } from "./components/Head";
import { MobileSchedule } from "./components/MobileSchedule";
import { ScheduleDesc } from "./components/ScheduleDesc";
import { SdcSchedule } from "./components/SdcSchedule";
import { ComingSoon } from "./styles";

export const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["600", "500", "400", "300", "200", "700"],
});
export const inter = Inter({ subsets: ["latin"], weight: ["600", "500", "400", "300", "200", "700", "800"] });

export const SDC_READY = false;

export default function SDC() {
  return (
    <div>
      <Head />
      <Countdown startingTime="Jul 7, 2023 08:30:00" />
      <FeatureList />
      <ScheduleDesc />
      {SDC_READY && (
        <>
          <SdcSchedule />
          <MobileSchedule />
        </>
      )}
    </div>
  );
}
