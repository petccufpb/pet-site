"use client";

import styled from "styled-components";

export const PodcastContainer = styled.div`
  padding-bottom: 5rem;

  > div:first-child {
    color: #a1a1aa;
    margin-top: 2rem;
    font-size: 0.9rem;
  }

  > h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
`;

export const Episodes = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 0.2rem;

  // first child
  > div:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  // last child
  > div:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  // every other child
  > div:nth-child(even) {
    background-color: #040422;
  }

  // every other child
  > div:nth-child(odd) {
    background-color: #05052e;
  }
`;

export const Episode = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 0.4rem;
  padding: 1rem;

  > img {
    margin: auto;
    border-radius: 1rem;
    border: 3px solid #38bcde;
  }
`;

export const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  font-family: "Inter Variable", sans-serif;

  > h2 {
    font-weight: 800;
    font-size: 1.5rem;
  }

  > div {
    font-size: 0.85rem;
    color: #d1d5db;
    max-height: 100%;
  }
`;

export const Playback = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  font-size: 1.5rem;

  color: #ffffff;

  > * {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
