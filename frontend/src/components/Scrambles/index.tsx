"use client";

import { useEffect, useState } from "react";

import { ScrambledText } from "./styles";

export function Scrambles({ text }: { text: string }) {
  function shuffle(word: string) {
    return word
      .split("")
      .sort(() => {
        return 0.5 - Math.random();
      })
      .join("");
  }

  const gen = () => {
    const textArray = [];
    if (text) {
      // variations with change in size
      for (let i = text.length; i >= 0; i--) {
        let tmp = shuffle(text);
        tmp = tmp.slice(0, text.length - i);
        textArray.push(tmp);
      }
      // variations without change in size
      for (let i = 0; i < 6; i++) {
        textArray.push(shuffle(text));
      }
      // normal text
      textArray.push(text);
    }
    return textArray;
  };

  const [textArray] = useState(gen);
  const [activeText, setActiveText] = useState(0);
  const [newScramble, setNewScramble] = useState<string | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const click = () => {
      if (activeText == textArray.length - 1) {
        setActiveText(0);
      }
      setPlay(true);
    };

    let interval: NodeJS.Timer | null = null;

    if (play && activeText < textArray.length - 1) {
      interval = setInterval(() => {
        setActiveText(activeText + 1);
      }, 90);
    } else if (!play) {
      click();
    }

    return () => clearInterval(interval || 0);
  }, [play, activeText, textArray.length]);

  return (
    <div>
      <ScrambledText>{newScramble || textArray[activeText]}</ScrambledText>
    </div>
  );
}
