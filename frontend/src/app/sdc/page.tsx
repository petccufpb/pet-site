"use client";

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
export const inter = Inter({ subsets: ["latin"], weight: "variable" });

export default function SDC() {
  return (
    <div>
      <Head />
      <Countdown startingTime="Jul 7, 2023 08:30:00" />
      <FeatureList />
      <ScheduleDesc />
      {/* Desktop: */}
      <SdcSchedule />
      {/* Mobile: */}
      <MobileSchedule />
    </div>
  );
}
