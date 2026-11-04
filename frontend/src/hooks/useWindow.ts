"use client";
import { useEffect, useState } from "react";

export const useWindow = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    innerHeight: 1080,
    innerWidth: 1920,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
};
