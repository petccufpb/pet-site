"use client";

import styled from "styled-components";

export const Content = styled.div`
  position: relative;
  margin-left: auto;
  width: 20px;

  svg {
    position: absolute;
  }

  svg:nth-child(2) {
    top: 50%;
    left: 50%;
    translate: -50%;
  }
`;
