"use client";

import { usePathname } from "next/navigation";
import { FaChevronUp } from "react-icons/fa";
import { RiGithubFill, RiInstagramFill, RiLinkedinFill, RiYoutubeFill } from "react-icons/ri";

import PetSince from "@assets/images/pet_since.svg?svgr";

import { Container, ScrollToTop, SocialMediaIconContainer } from "./styles";

export function Footer() {
  const pathname = usePathname();

  function handleScrollTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <Container pathname={pathname}>
      <div>
        <ScrollToTop onClick={() => handleScrollTop()}>
          <FaChevronUp size={16} color="#ffffff" />
        </ScrollToTop>

        <PetSince />

        <div>
          <span>PET Computação 2023</span>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>

      <div>
        <SocialMediaIconContainer
          aria-label="Instagram do PET Computação"
          href="https://www.instagram.com/petccufpb/"
        >
          <RiInstagramFill size={24} />
        </SocialMediaIconContainer>

        <SocialMediaIconContainer aria-label="Github do PET Computação" href="https://github.com/petccufpb">
          <RiGithubFill size={24} />
        </SocialMediaIconContainer>

        <SocialMediaIconContainer
          aria-label="Linkedin do PET Computação"
          href="https://www.linkedin.com/company/petccufpb/"
        >
          <RiLinkedinFill size={24} />
        </SocialMediaIconContainer>

        <SocialMediaIconContainer
          aria-label="Youtube do PET Computação"
          href="https://www.youtube.com/@PETComputacaoUFPB"
        >
          <RiYoutubeFill size={24} />
        </SocialMediaIconContainer>
      </div>
    </Container>
  );
}
