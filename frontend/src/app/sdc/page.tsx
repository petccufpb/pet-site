import { SDCScheduleData } from "sdc";

import { Countdown } from "./components/Countdown";
import { FeatureList } from "./components/FeaturesList";
import { Head } from "./components/Head";
import { MobileSchedule } from "./components/MobileSchedule";
import { ScheduleDesc } from "./components/ScheduleDesc";
import { SdcSchedule } from "./components/SdcSchedule";

export const SDC_READY = true;

export default async function SDC() {
  const sdcData: SDCScheduleData = await (
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/editions/latest?project=SDC", {
      cache: "no-store",
    })
  ).json();

  return (
    <div>
      <Head data={sdcData} />
      <Countdown startingTime={sdcData.date} />
      <FeatureList />
      <ScheduleDesc />
      {SDC_READY && (
        <>
          <SdcSchedule data={sdcData} />
          <MobileSchedule data={sdcData} />
        </>
      )}
    </div>
  );
}
