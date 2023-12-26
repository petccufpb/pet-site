"use client";
import { Link } from "@hyoretsu/react-components";
import styled from "styled-components";

export const Styling = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.5rem;
  height: 2.5rem;
  background-color: #afafaf33;

  border: 1px solid #ffffff;
  border-radius: 6px;

  > svg {
    color: #ffffff;
  }

  @media (min-width: 768px) {
    & + & {
      margin-left: 0.5rem;
    }
  }
`;
