import { useEffect, useState } from "react";

export const useWindow = () => {
  const [localWindow, setWindow] = useState<Window | null>(null);

  useEffect(() => {
    setWindow(window);
  }, []);

  return localWindow;
};
