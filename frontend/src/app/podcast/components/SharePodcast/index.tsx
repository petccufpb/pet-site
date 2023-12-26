"use client";

import { FaShareNodes } from "react-icons/fa6";

export default function SharePodcast({ podcastLink }: { podcastLink: string }) {
  async function shareLink(url: string) {
    if (navigator.share) {
      navigator.share({
        title: "Além do Ponto e Vírgula",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
    }
  }

  return <FaShareNodes onClick={() => shareLink(podcastLink)} />;
}
