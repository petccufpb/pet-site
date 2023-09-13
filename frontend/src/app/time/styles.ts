"use client";

import Image from "next/image";
import styled from "styled-components";

export const PhotoContainer = styled.div`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  aspect-ratio: auto 1440 / 450;
  margin-top: 1rem;
  position: relative;
`;

export const BGExtender = styled.div`
  position: absolute;
  left: calc((100vw - 70rem) / -2);
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: #182240;
  z-index: -1;
`;

export const TeamPhoto = styled.div`
  position: absolute;
  left: calc((100vw - 70rem) / -2);
  top: 0;
  width: 100vw;
  height: 100%;
  background-image: url("/images/foto-time.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% calc(50% + 100px);
  border-radius: 2.5rem 2.5rem 0 0;
`;

export const AbsoluteDiv = styled.div`
  position: absolute;
`;

export const DescriptionContainer = styled(AbsoluteDiv)`
  position: absolute;
  left: calc((100vw - 70rem) / -2);
  height: 45%;
  bottom: 0;
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

export const ImgContainer = styled.div`
  position: relative;
  height: 25rem;
`;

export const Petrucio = styled(Image)`
  position: absolute;
  bottom: 0;
  right: -20%;
  z-index: 99;
`;
