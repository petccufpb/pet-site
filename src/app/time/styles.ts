"use client";

import Image from "next/image";
import styled from "styled-components";

export const Members = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

export const SectionTitle = styled.h1`
  margin-bottom: 2rem;
  margin-top: 2rem;
`;
