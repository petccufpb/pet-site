"use client";
import styled, { keyframes } from "styled-components";

export const GenericDiv = styled.div<{
  w?: string;
  maxw?: string;
  minw?: string;
  nw?: boolean;
  color?: string;
  relative?: boolean;
  absolute?: boolean;
  left?: string;
  top?: string;
  bg?: string;
  padding?: string;
  rounded?: string;
  mr?: string;
  h?: string;
  br?: string;
  bb?: string;
  stretch?: boolean;
  margin?: string;
  square?: boolean;
  right?: string;
  inline?: boolean;
}>`
  ${({ w }) => w && `width: ${w}`};
  ${({ maxw }) => maxw && `max-width: ${maxw}`};
  ${({ minw }) => minw && `min-width: ${minw}`};
  ${({ nw }) => nw && `white-space: nowrap`};
  ${({ color }) => color && `color: ${color}`};
  ${({ relative }) => relative && `position: relative`};
  ${({ absolute }) => absolute && `position: absolute`};
  ${({ left }) => left && `left: ${left}`};
  ${({ top }) => top && `top: ${top}`};
  ${({ bg }) => bg && `background: ${bg}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ rounded }) => rounded && `border-radius: ${rounded}`};
  ${({ mr }) => mr && `margin-right: ${mr}`};
  ${({ h }) => h && `height: ${h}`};
  ${({ br }) => br && `border-right: ${br}`};
  ${({ bb }) => bb && `border-bottom: ${bb}`};
  ${({ stretch }) => stretch && `flex-grow: 1`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ square }) => square && `aspect-ratio: 1`};
  ${({ right }) => right && `right: ${right}`};
  ${({ inline }) => inline && `display: inline`};

  z-index: 10;

  transition-duration: 0.2s;
  transition-property: transform background color;
  transition-timing-function: ease-out;
`;

export const HomeContainer = styled.div`
  font-family: "Lexend Variable", sans-serif;
  font-weight: 400;
`;

export const Text = styled(GenericDiv)<{
  weight?: number | `${number}`;
  alt?: boolean;
  center?: boolean;
  size?: string;
  loose?: boolean;
  tight?: boolean;
  italic?: boolean;
  up?: boolean;
  space?: boolean;
  inter?: boolean;
}>`
  ${({ size }) => size && `font-size: ${size}`};
  font-family: ${({ alt, inter }) => `
    ${inter ? "Inter Variable" : alt ? "Bai Jamjuree" : "'Roboto Flex Variable'"}, sans-serif
  `};
  color: ${({ color }) => color || "#a8a8b3"};

  ${({ nw }) => nw && `white-space: nowrap`};
  ${({ weight, alt }) =>
    weight && (alt ? `font-weight: ${weight};` : `font-variation-settings: 'wght' ${weight}`)};
  ${({ center }) => center && `text-align: center`};
  ${({ loose }) => loose && `line-height: 1.65em`};
  ${({ tight }) => tight && `line-height: 1em`};
  ${({ italic }) => italic && `font-style: italic`};
  ${({ up }) => up && `vertical-allign: top`};
  ${({ space }) => space && `white-space: pre-wrap;`};
`;

export const Title = styled.h1<{ level?: number; maxw?: string; w?: string; center?: boolean }>`
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: bold;
  color: #e1e1e6;
  font-size: ${({ level }) => (level ? `${2 + 0.5 * level}rem` : "2rem")};
  margin: 0;
  line-height: 1em;

  ${({ maxw }) => maxw && `max-width: ${maxw}`};
  ${({ w }) => w && `width: ${w}`};
  ${({ center }) => center && `text-align: center`};
`;

export const Flex = styled(GenericDiv)<{
  vertical?: boolean;
  gap?: string;
  wrap?: boolean;
  align?: string;
  justify?: string;
  center?: boolean;
  font?: string;
  inline?: boolean;
  reverse?: boolean;
}>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};

  ${({ gap }) => gap && `gap: ${gap}`};
  ${({ wrap }) => wrap && `flex-wrap: wrap`};
  ${({ reverse }) => reverse && `flex-wrap: wrap-reverse`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ center }) => center && `margin: 0 auto`};
  ${({ font }) => font && `font-family: ${font}`};
`;

const CarouselAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const CarouselFlex = styled(Flex)`
  animation: ${CarouselAnimation} 25s linear infinite;
`;

export const Button = styled.button<{
  maxw?: string;
  flex?: boolean;
  alt?: boolean;
  gapanim?: boolean;
  ml?: string;
}>`
  background: ${({ alt }) => (alt ? "#0072ed33" : "#04d36133")};
  border: 1px solid ${({ alt }) => (alt ? "#0072ed" : "#04d361")};
  border-radius: 6px;
  color: white;
  font-family: "Roboto Flex Variable", sans-serif;
  font-variation-settings: "wght" 500;
  cursor: pointer;
  z-index: 90;

  padding: 1rem;

  ${({ maxw }) => maxw && `max-width: ${maxw}`};
  ${({ ml }) => ml && `margin-left: ${ml}`};
  width: 100%;

  display: ${({ flex }) => (flex ? "flex" : "block")};
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  transition-duration: 0.2s;

  &:hover {
    background: ${({ alt }) => (alt ? "#0072ed44" : "#04d36144")};
    box-shadow: 0 0 50px 2px ${({ alt }) => (alt ? "#0072ed59" : "#04d36149")};
    gap: ${({ gapanim }) => (gapanim ? "1rem" : "0.5rem")};
  }
`;

export const IgnorePageWidth = styled.div<{ w?: string; top?: string }>`
  position: absolute;
  left: 0;
  ${({ top }) => top && `top: ${top};`}

  width: ${({ w }) => w || "100%"};
`;

export const HR = styled.div<{ w?: string }>`
  height: 1px;
  background: #ffffff4d;

  ${({ w }) => (w ? `width: ${w}` : "flex-grow: 1")};
`;

export const Card = styled(Flex)<{ index: number; highlighted: boolean; zIndex: number }>`
  flex-direction: column;
  width: 390px;
  height: 450px;
  position: absolute;
  left: ${({ index }) => index * 90}px;
  background: ${({ highlighted }) => (highlighted ? "#e1e1e6" : "black")};
  color: ${({ highlighted }) => (highlighted ? "black" : "#e1e1e6")};
  transition: 0.2s;
  transition-property: transform background color;
  transition-timing-function: ease-out;
  z-index: ${({ zIndex, highlighted }) => (highlighted ? 100 : zIndex)};
  ${({ highlighted }) => highlighted && "border: 1px solid #0000004d;"}

  &:hover {
    transform: scale(1.035);
    z-index: 10;
  }
`;

export const CardHeader = styled.div`
  height: 90px;
  width: 100%;
  border-bottom: 1px solid #0000004d;
  font-family: "Bai Jamjuree", sans-serif;
  display: flex;
`;

export const CardTitle = styled.h1`
  padding: 1.5rem;
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
  margin: auto 0;
`;

export const CardIndex = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
  border-right: 1px solid #0000004d;
`;

export const VL = styled.div`
  height: 100%;
  width: 1px;
  background: #afafaf;
`;

export const WavesContainer = styled.div`
  position: absolute;
  bottom: 0;
  /* left: 50%; */
  width: 150vw;
  opacity: 0.05;
  transform: translateX(0%);
`;

export const WavesBackgroundMasker = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: linear-gradient(to bottom, #000000 30%, #00000000);
`;

export const Bold = styled.span`
  color: black;
`;
