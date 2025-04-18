"use client";

import { useEffect, useState } from "react";

import { CountdownContainer, Divider, TimeUnit, Timer } from "./styles";

export function Countdown({ startingTime }: { startingTime: string }) {
  const countDownDate = new Date(startingTime).getTime();

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

      if (distance < 0) {
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
        clearInterval(x);
      }
    }, 1000);

    setTimeRemaining(countTime());
  }, [countDownDate]);

  return (
    <CountdownContainer>
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
      <span>
        THIS IS A<br />
        GAME CHANGER
      </span>
    </CountdownContainer>
  );
}
