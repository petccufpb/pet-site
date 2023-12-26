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
      Icon = () => <RiGithubFill size={20} />;
      break;
    case "Instagram":
      Icon = () => <RiInstagramFill size={20} />;
      break;
    case "LinkedIn":
      Icon = () => <RiLinkedinFill size={20} />;
      break;
    case "YouTube":
      Icon = () => <RiYoutubeFill size={20} />;
      break;
  }

  return (
    <Styling href={link}>
      <Icon />
    </Styling>
  );
}
