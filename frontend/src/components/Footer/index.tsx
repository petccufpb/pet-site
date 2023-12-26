"use client";
import { usePathname } from "next/navigation";
import { FaChevronUp } from "react-icons/fa";

import PetSince from "@assets/images/pet_since.svg?svgr";

import { SNSIcon } from "./components/SNSIcon";
import { Container, ScrollToTop } from "./styles";

export function Footer() {
  const pathname = usePathname();

  return (
    <Container pathname={pathname}>
      <div>
        <ScrollToTop
          onClick={() =>
            window.scroll({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <FaChevronUp size={24} color="#ffffff" />
        </ScrollToTop>

        <PetSince />

        <div>
          <span>PET Computação 2023</span>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>

      <div>
        <SNSIcon sns="Instagram" link="https://www.instagram.com/petccufpb" />
        <SNSIcon sns="GitHub" link="https://github.com/petccufpb" />
        <SNSIcon sns="LinkedIn" link="https://www.linkedin.com/company/petccufpb" />
        <SNSIcon sns="YouTube" link="https://www.youtube.com/@PETComputacaoUFPB" />
      </div>
    </Container>
  );
}
