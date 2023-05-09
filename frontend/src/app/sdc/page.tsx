"use client";

import { Bai_Jamjuree, Inter } from "next/font/google";

import { Background } from "./components/Background";
import { Countdown } from "./components/Countdown";
import { FeatureList } from "./components/FeaturesList";
import { Head } from "./components/Head";
import { ScheduleDesc } from "./components/ScheduleDesc";
import { SdcSchedule } from "./components/SdcSchedule";

export const baiJamjuree = Bai_Jamjuree({ subsets: ["latin"], weight: ["600", "500", "400", "300", "200"] });
export const inter = Inter({ subsets: ["latin"], weight: ["500", "400", "300"] });

export default function SDC() {
  return (
    <div>
      <Background />
      <Head />
      <Countdown startingTime="Jul 7, 2023 08:30:00" />
      <FeatureList />
      <ScheduleDesc />
      <SdcSchedule />
    </div>
  );
}
