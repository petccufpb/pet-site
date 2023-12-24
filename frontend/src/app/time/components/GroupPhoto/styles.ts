"use client";
import styled from "styled-components";

export const groupPhotoHeight = window.innerWidth <= 468 ? "20rem" : "55rem";

export const Styling = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  width: 100%;
  height: ${groupPhotoHeight};

  img {
    position: absolute;
    left: -8%;
    top: 0;

    width: 116%;
    height: ${groupPhotoHeight};
  }

  @media (max-width: 468px) {
    text-align: center;

    top: 7rem;
  }
`;
