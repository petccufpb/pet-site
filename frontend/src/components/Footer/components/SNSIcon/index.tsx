"use client";
import { IconType } from "react-icons";
import { RiGithubFill, RiInstagramFill, RiLinkedinFill, RiYoutubeFill } from "react-icons/ri";

import { Styling } from "./styles";

export interface SNSIconProps {
  link: string;
  sns: "GitHub" | "Instagram" | "LinkedIn" | "YouTube";
}

export function SNSIcon({ link, sns }: SNSIconProps) {
  let Icon: IconType;

  switch (sns) {
    case "GitHub":
      Icon = () => <RiGithubFill />;
      break;
    case "Instagram":
      Icon = () => <RiInstagramFill />;
      break;
    case "LinkedIn":
      Icon = () => <RiLinkedinFill />;
      break;
    case "YouTube":
      Icon = () => <RiYoutubeFill />;
      break;
  }

  return (
    <Styling href={link}>
      <Icon size={24} />
    </Styling>
  );
}
