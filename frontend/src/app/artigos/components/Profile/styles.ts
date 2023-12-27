"use client";
import styled from "styled-components";

export const ProfileContainer = styled.section`
  width: 100%;
  min-height: 13.25rem;
  background: linear-gradient(90deg, #010530, #010530) padding-box,
    linear-gradient(180deg, #e1e1e6 0%, rgba(225, 225, 230, 0) 100%) border-box;
  box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.2);

  padding: 2rem 2.5rem;
  display: flex;
  gap: 2rem;
  border: 1px solid transparent;
  border-radius: 1rem;
`;

export const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    h1 {
      font-size: ${({ theme }) => theme.textSizes.articles["title-title-l"]};
      color: ${({ theme }) => theme.colors.articles["base-title"]};
      line-height: 130%;
    }
  }

  ul {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: auto;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        width: 1.125rem;
        height: 1.125rem;
        color: ${({ theme }) => theme.colors.articles["base-label"]};
      }
    }
  }
`;
