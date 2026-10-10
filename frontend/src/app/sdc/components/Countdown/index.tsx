"use client";

import { useEffect, useState } from "react";

import { CountdownContainer, Divider, TimeUnit, Timer } from "./styles";

export function Countdown({ startingTime, sdcNumber }: { startingTime: string; sdcNumber: number }) {
  const countDownDate = new Date(startingTime).getTime();
  // Tratando o evento como tendo a duração de 6 dias (Segunda-Sábado) / Acabando à meia noite do Domingo
  const endDate = new Date(countDownDate);
  endDate.setDate(endDate.getDate() + 6);
  endDate.setHours(0);

  const [overrideMessage, setOverrideMessage] = useState<string | null>(null);

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    function countTime() {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          done: true,
        };
      }

      return {
        days,
        hours,
        minutes,
        seconds,
        done: false,
      };
    }

    const x = setInterval(() => {
      const time = countTime();
      setTimeRemaining(countTime());

      if (time.done) {
        if (new Date() <= endDate) setOverrideMessage(`A SDC ${romanize(sdcNumber)} está acontencedo!`);
        else setOverrideMessage(`Em breve uma nova SDC…`);

        clearInterval(x);
      }
    }, 1000);

    setTimeRemaining(countTime());
  }, []);

  return (
    <CountdownContainer>
      {overrideMessage ? (
        <h2>{overrideMessage}</h2>
      ) : (
        <Timer>
          <div>
            O EVENTO
            <br />
            COMEÇA EM
          </div>
          <Divider />
          <TimeUnit>
            <h3>{timeRemaining?.days}</h3>
            <span>DIAS</span>
          </TimeUnit>
          <TimeUnit>
            <h3>{timeRemaining.hours}</h3>
            <span>HOR</span>
          </TimeUnit>
          <TimeUnit>
            <h3>{timeRemaining.minutes}</h3>
            <span>MIN</span>
          </TimeUnit>
          <TimeUnit>
            <h3>{timeRemaining.seconds}</h3>
            <span>SEG</span>
          </TimeUnit>
        </Timer>
      )}
      <span>
        THIS IS A<br />
        GAME CHANGER
      </span>
    </CountdownContainer>
  );
}

function romanize(num: number) {
  if (isNaN(num)) return NaN;
  let digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+(digits.pop() ?? 0) + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
