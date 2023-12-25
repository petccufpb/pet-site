"use client";
import styled from "styled-components";

let innerWidth = 1920;
if (typeof window !== "undefined") {
  ({ innerWidth } = window);
}

export const groupPhotoHeight = innerWidth ? "20rem" : "55rem";

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
