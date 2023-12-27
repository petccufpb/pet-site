"use client";
import { useEffect, useState } from "react";

export const useWindow = () => {
  const [localWindow, setWindow] = useState({
    innerHeight: 1080,
    innerWidth: 1920,
  });

  useEffect(() => {
    setWindow(window);
  }, []);

  return localWindow;
};
