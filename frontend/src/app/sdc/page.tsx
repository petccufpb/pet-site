import { SDCScheduleData } from "@types/sdc";
import { Bai_Jamjuree, Inter } from "next/font/google";

import { Countdown } from "./components/Countdown";
import { FeatureList } from "./components/FeaturesList";
import { Head } from "./components/Head";
import { MobileSchedule } from "./components/MobileSchedule";
import { ScheduleDesc } from "./components/ScheduleDesc";
import { SdcSchedule } from "./components/SdcSchedule";

export const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["600", "500", "400", "300", "200", "700"],
});
export const inter = Inter({ subsets: ["latin"], weight: ["600", "500", "400", "300", "200", "700", "800"] });

export const SDC_READY = true;

export default async function SDC() {
  const sdcData: SDCScheduleData = await (
    await fetch("http://localhost:3333/projects/editions/latest?project=SDC")
  ).json();

  return (
    <div>
      <Head />
      <Countdown startingTime={sdcData.date} />
      <FeatureList />
      <ScheduleDesc />
      {SDC_READY && (
        <>
          <SdcSchedule data={sdcData} />
          <MobileSchedule />
        </>
      )}
    </div>
  );
}
