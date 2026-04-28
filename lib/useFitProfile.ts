"use client";

import { useState, useEffect } from "react";
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

export function useFitProfile() {
  const [measurements, setMeasurements] = useState<FitMeasurements>({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    inseam: "",
    hasUsedAi: false,
    interactionCount: 0
  });
  const [mounted, setMounted] = useState(false);

  const { user, isLoaded } = useUser();

  // 1. Initial Load (Checks Cloud first, then falls back to LocalStorage)
  useEffect(() => {
    setMounted(true);
    
    const loadProfile = async () => {
      let activeMeasurements = null;

      // Prioritize Cloud Database if user is securely logged in
      if (isLoaded && user) {
         const cloudData = await getCloudIntelligence();
         if (cloudData.success && cloudData.profile) {
            activeMeasurements = {
               height: cloudData.profile.height || "",
               weight: cloudData.profile.weight || "",
               chest: cloudData.profile.chest || "",
               waist: cloudData.profile.waist || "",
               hips: cloudData.profile.hips || "",
               inseam: cloudData.profile.inseam || "",
               hasUsedAi: cloudData.profile.hasUsedAi || false,
               interactionCount: cloudData.profile.interactionCount || 0
            };
            // Sync cloud down to fast local storage for UI snapping
            localStorage.setItem("celestials-fit-profile", JSON.stringify(activeMeasurements));
         }
      }
      
      // Fallback to local storage if not logged in or cloud is empty
      if (!activeMeasurements) {
        const stored = localStorage.getItem("celestials-fit-profile");
        if (stored) {
          try {
            activeMeasurements = JSON.parse(stored);
          } catch (e) {
            console.error("Failed to parse fit profile", e);
          }
        }
      }

      if (activeMeasurements) {
        setMeasurements(activeMeasurements);
      }
    };

    loadProfile();
  }, [user, isLoaded]);

  // 1.5 Increment interaction count on page view (Transition tracking)
  useEffect(() => {
    if (mounted) {
      const updated = { ...measurements, interactionCount: measurements.interactionCount + 1 };
      setMeasurements(updated);
      localStorage.setItem("celestials-fit-profile", JSON.stringify(updated));
    }
  }, [mounted]);

  // 2. Global Save Trigger (Saves to Local + securely pipelines to Neon DB)
  const saveMeasurements = (newMeasurements: FitMeasurements) => {
    setMeasurements(newMeasurements);
    if (mounted) {
      localStorage.setItem("celestials-fit-profile", JSON.stringify(newMeasurements));
      
      // Autonomous Database Pipeline
      if (isLoaded && user) {
         syncUserIntelligence(newMeasurements).catch(err => console.error("Cloud DB ML Sync failed", err));
      }
    }
  };

  return { measurements, saveMeasurements, mounted };
}
