import { MemberContact } from "backend";
import { FaEnvelope, FaGithubAlt, FaInstagram } from "react-icons/fa";

export function SocialMediaLink({ contactInfo }: { contactInfo: MemberContact }) {
  const iconSize = 20;

  switch (contactInfo.name) {
    case "Instagram":
      return (
        <a href={`https://instagram.com/${contactInfo.snsId}`}>
          <FaInstagram size={iconSize} />
        </a>
      );
    case "Email":
      return (
        <a href={`mailto:${contactInfo.snsId}`}>
          <FaEnvelope size={iconSize} />
        </a>
      );
    case "Github":
      return (
        <a href={`https://github.com/${contactInfo.snsId}`}>
          <FaGithubAlt size={iconSize} />
        </a>
      );
    default:
      return <></>;
  }
}
