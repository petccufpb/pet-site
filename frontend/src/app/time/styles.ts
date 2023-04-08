"use client";

import Image from "next/image";
import styled from "styled-components";

export const PhotoContainer = styled.div`
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  width: 100%;
  aspect-ratio: auto 1440 / 450;
  margin-top: 1rem;
  position: relative;
`;

export const TeamPhoto = styled(Image)`
  max-width: 100%;
  object-fit: contain;
  object-position: 0 -8%;
`;

export const AbsoluteDiv = styled.div`
  position: absolute;
`;

export const DescriptionContainer = styled(AbsoluteDiv)`
  height: 45%;
  bottom: 0;
  left: 0;
`;

export const PETDescription = styled(AbsoluteDiv)`
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;

  div {
    font-weight: 200;
  }
`;

export const Content = styled.div`
  padding-bottom: 3rem;
`;
