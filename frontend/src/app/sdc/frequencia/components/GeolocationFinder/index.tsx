"use client";

import { useEffect } from "react";

export function GeolocationFinder({
  onLocationAccess,
}: {
  onLocationAccess: (position: GeolocationPosition | null) => void;
}) {
  useEffect(() => {
    const error: PositionErrorCallback = () => {
      onLocationAccess(null);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onLocationAccess, error);
    }
  }, [onLocationAccess]);

  return <></>;
}
