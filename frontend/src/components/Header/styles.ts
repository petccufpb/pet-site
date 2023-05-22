"use client";
import Link from "next/link";
import styled from "styled-components";

export const VerticalLine = styled.span`
  border-left: 1px solid ${({ theme }) => theme.colors["base-white"]};
  margin: 0 auto 0 auto;
`;

export const PETHeader = styled.header`
  padding: 2rem 0 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  overflow-x: hidden;
`;

export const RouteList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
`;

export const ListItem = styled.li`
  list-style: none;
  text-decoration: none;
`;

export const Route = styled.div`
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.colors["base-white"]};
`;

export const RouteLink = styled(Link)<{ tab: string }>`
  font-weight: ${props =>
    props.tab.split("/")[1] === props.href.toString().split("/")[1] ? "bold" : "normal"};
  color: ${({ theme }) => theme.colors["base-white"]};
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  position: relative;

  ::after {
    content: "";
    display: ${props => (props.tab.split("/")[1] === props.href.toString().split("/")[1] ? "block" : "none")};
    position: absolute;
    width: 1rem;
    bottom: -0.5rem;
    height: 4px;
    border-radius: 3rem;
    background: ${({ theme }) => theme.colors["base-blue"]};
  }
`;
