"use client";

import { useState, useEffect } from "react";

export interface FitMeasurements {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  inseam: string;
}

export function useFitProfile() {
  const [measurements, setMeasurements] = useState<FitMeasurements>({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    inseam: ""
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("celestials-fit-profile");
    if (stored) {
      try {
        setMeasurements(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse fit profile", e);
      }
    }
  }, []);

  const saveMeasurements = (newMeasurements: FitMeasurements) => {
    setMeasurements(newMeasurements);
    if (mounted) {
      localStorage.setItem("celestials-fit-profile", JSON.stringify(newMeasurements));
    }
  };

  return { measurements, saveMeasurements, mounted };
}
