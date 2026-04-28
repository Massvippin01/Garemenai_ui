"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { getCloudIntelligence, syncUserIntelligence } from "./actions/user.actions";

export interface FitMeasurements {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  inseam: string;
  hasUsedAi: boolean;
  interactionCount: number;
}

const DEFAULT_MEASUREMENTS = {
  height: "", weight: "", chest: "", waist: "", hips: "", inseam: "", hasUsedAi: false, interactionCount: 0
};

export function useFitProfile() {
  const [measurements, setMeasurements] = useState<FitMeasurements>(DEFAULT_MEASUREMENTS);
  const [mounted, setMounted] = useState(false);
  const { user, isLoaded } = useUser();
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;

    const initialize = async () => {
      // 1. Load Local
      let currentData = { ...DEFAULT_MEASUREMENTS };
      const local = localStorage.getItem("celestials-fit-profile");
      if (local) {
        try { currentData = { ...currentData, ...JSON.parse(local) }; } catch(e){}
      }
      
      // Initial local snap for UI speed
      setMeasurements(currentData);
      setMounted(true);

      // 2. Hydrate & Sync Cloud
      if (isLoaded && user) {
        initRef.current = true;
        const res = await getCloudIntelligence();
        if (res.success && res.profile) {
           const p = res.profile;
           // Prefer cloud data if it exists, otherwise keep local (in case local was captured before auth)
           const merged = {
              height: p.height || currentData.height,
              weight: p.weight || currentData.weight,
              chest: p.chest || currentData.chest,
              waist: p.waist || currentData.waist,
              hips: p.hips || currentData.hips,
              inseam: p.inseam || currentData.inseam,
              hasUsedAi: p.hasUsedAi || currentData.hasUsedAi,
              interactionCount: (p.interactionCount || currentData.interactionCount) + 1
           };
           setMeasurements(merged);
           localStorage.setItem("celestials-fit-profile", JSON.stringify(merged));
        } else {
           // Cloud empty, push local data to cloud
           const updated = { ...currentData, interactionCount: currentData.interactionCount + 1 };
           setMeasurements(updated);
           localStorage.setItem("celestials-fit-profile", JSON.stringify(updated));
           syncUserIntelligence(updated).catch(console.error);
        }
      } else if (isLoaded && !user) {
         // Guest user, just inc
         initRef.current = true;
         const updated = { ...currentData, interactionCount: currentData.interactionCount + 1 };
         setMeasurements(updated);
         localStorage.setItem("celestials-fit-profile", JSON.stringify(updated));
      }
    };
    
    initialize();
  }, [isLoaded, user]);

  const saveMeasurements = (newMeasurements: FitMeasurements) => {
    setMeasurements(newMeasurements);
    localStorage.setItem("celestials-fit-profile", JSON.stringify(newMeasurements));
    if (isLoaded && user) {
       syncUserIntelligence(newMeasurements).catch(err => console.error("Cloud Error", err));
    }
  };

  const updateLocalMeasurements = (newMeasurements: FitMeasurements) => {
    setMeasurements(newMeasurements);
    localStorage.setItem("celestials-fit-profile", JSON.stringify(newMeasurements));
  };

  return { measurements, saveMeasurements, updateLocalMeasurements, mounted };
}
