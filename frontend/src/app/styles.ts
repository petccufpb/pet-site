"use client";
import styled, { keyframes } from "styled-components";

type GenericElementProps = {
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
  bt?: string;
  stretch?: boolean;
  margin?: string;
  square?: boolean;
  right?: string;
  inline?: boolean;
  center?: boolean;
  hide?: boolean;
  overflowx?: string;
};

type GenericElementPropsWithMobile = GenericElementProps & {
  mobile?: GenericElementProps;
};

type FlexProps = {
  vertical?: boolean;
  gap?: string;
  wrap?: boolean;
  align?: string;
  justify?: string;
  center?: boolean;
  font?: string;
  inline?: boolean;
  reverse?: boolean;
};

type FlexPropsWithMobile = FlexProps & {
  mobile?: FlexProps;
};

type TitleProps = { level?: number; maxw?: string; w?: string; center?: boolean };

type TitlePropsWithMobile = TitleProps & {
  mobile?: TitleProps;
};

export const GenericDiv = styled.div<GenericElementPropsWithMobile>`
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
  ${({ bt }) => bt && `border-top: ${bt}`};
  ${({ stretch }) => stretch && `flex-grow: 1`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ square }) => square && `aspect-ratio: 1`};
  ${({ right }) => right && `right: ${right}`};
  ${({ inline }) => inline && `display: inline`};
  ${({ center }) => center && `text-align: center`};
  ${({ hide }) => hide && `display: none`};
  ${({ overflowx }) => overflowx && `overflow-x: ${overflowx}`};

  z-index: 10;

  transition-duration: 0.2s;
  transition-property: transform background color;
  transition-timing-function: ease-out;

  @media (max-width: 1100px) {
    ${({ mobile }) => mobile?.w && `width: ${mobile.w}`};
    ${({ mobile }) => mobile?.maxw && `max-width: ${mobile.maxw}`};
    ${({ mobile }) => mobile?.minw && `min-width: ${mobile.minw}`};
    ${({ mobile }) => mobile?.nw && `white-space: nowrap`};
    ${({ mobile }) => mobile?.color && `color: ${mobile.color}`};
    ${({ mobile }) => mobile?.relative && `position: relative`};
    ${({ mobile }) => mobile?.absolute && `position: absolute`};
    ${({ mobile }) => mobile?.left && `left: ${mobile.left}`};
    ${({ mobile }) => mobile?.top && `top: ${mobile.top}`};
    ${({ mobile }) => mobile?.bg && `background: ${mobile.bg}`};
    ${({ mobile }) => mobile?.padding && `padding: ${mobile.padding}`};
    ${({ mobile }) => mobile?.rounded && `border-radius: ${mobile.rounded}`};
    ${({ mobile }) => mobile?.mr && `margin-right: ${mobile.mr}`};
    ${({ mobile }) => mobile?.h && `height: ${mobile.h}`};
    ${({ mobile }) => mobile?.br && `border-right: ${mobile.br}`};
    ${({ mobile }) => mobile?.bb && `border-bottom: ${mobile.bb}`};
    ${({ mobile }) => mobile?.bt && `border-top: ${mobile.bt}`};
    ${({ mobile }) => mobile?.stretch && `flex-grow: 1`};
    ${({ mobile }) => mobile?.margin && `margin: ${mobile.margin}`};
    ${({ mobile }) => mobile?.square && `aspect-ratio: 1`};
    ${({ mobile }) => mobile?.right && `right: ${mobile.right}`};
    ${({ mobile }) => mobile?.inline && `display: inline`};
    ${({ mobile }) => mobile?.center && `text-align: center`};
    ${({ mobile }) => mobile?.hide && `display: none !important`};
    ${({ mobile }) => mobile?.overflowx && `overflow-x: ${mobile.overflowx}`};
  }
`;

export const HomeContainer = styled.div`
  font-family: "Lexend Variable", sans-serif;
  font-weight: 400;
`;

export const Text = styled(GenericDiv)<{
  weight?: number | `${number}`;
  alt?: boolean;
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

export const Title = styled.h1<TitlePropsWithMobile>`
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: bold;
  color: #e1e1e6;
  font-size: ${({ level }) => (level !== undefined ? `${2 + 0.5 * level}rem` : "2rem")};
  margin: 0;
  line-height: 1em;

  ${({ maxw }) => maxw && `max-width: ${maxw}`};
  ${({ w }) => w && `width: ${w}`};
  ${({ center }) => center && `text-align: center`};

  @media (max-width: 1100px) {
    font-size: ${({ mobile, level }) =>
      mobile?.level !== undefined
        ? `${2 + 0.5 * mobile.level}rem`
        : level
        ? `${2 + 0.5 * level}rem`
        : "2rem"};
    ${({ mobile }) => mobile?.maxw && `max-width: ${mobile.maxw}`};
    ${({ mobile }) => mobile?.w && `width: ${mobile.w}`};
    ${({ mobile }) => mobile?.center && `text-align: center`};
  }
`;

export const Flex = styled(GenericDiv)<GenericElementPropsWithMobile & FlexPropsWithMobile>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};

  ${({ gap }) => gap && `gap: ${gap}`};
  ${({ wrap }) => wrap && `flex-wrap: wrap`};
  ${({ reverse }) => reverse && `flex-wrap: wrap-reverse`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ center }) => center && `margin: 0 auto`};
  ${({ font }) => font && `font-family: ${font}`};

  @media (max-width: 1100px) {
    display: ${({ mobile }) => (mobile?.inline ? "inline-flex" : "flex")};
    flex-direction: ${({ mobile, vertical }) => (mobile?.vertical ? "column" : vertical ? "column" : "row")};

    ${({ mobile }) => mobile?.gap && `gap: ${mobile.gap}`};
    ${({ mobile }) => mobile?.wrap && `flex-wrap: wrap`};
    ${({ mobile }) => mobile?.reverse && `flex-wrap: wrap-reverse`};
    ${({ mobile }) => mobile?.align && `align-items: ${mobile.align}`};
    ${({ mobile }) => mobile?.justify && `justify-content: ${mobile.justify}`};
    ${({ mobile }) => mobile?.center && `margin: 0 auto`};
    ${({ mobile }) => mobile?.font && `font-family: ${mobile.font}`};
  }
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
  mx?: string;
  mobileMx?: string;
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
  ${({ mx }) => mx && `margin: 0 ${mx}`};
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

  @media (max-width: 1100px) {
    ${({ mobileMx }) => mobileMx && `margin: 0 ${mobileMx}`};
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

export const VL = styled.div<{ nomobile?: boolean }>`
  height: 100%;
  width: 1px;
  background: #afafaf;

  ${({ nomobile }) => nomobile && "@media (max-width: 1100px) { display: none; }"}
`;

export const Bold = styled.span`
  color: black;
`;
