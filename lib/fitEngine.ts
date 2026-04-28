import { Product } from "@/types";
import { FitMeasurements } from "./useFitProfile";

export interface FitAnalysis {
  recommendedSize: string | null;
  confidenceScore: number;
  returnProbability: number;
  reasons: string[];
}

/**
 * Sweeps all dimensions array to formulate a mathematically optimal size recommendation.
 */
export function recommendBestSize(product: Product, user: FitMeasurements): FitAnalysis {
    // Default failover if AI hasn't secured dimensions
    if (!product.sizeMeasurements || (!user.chest && !user.waist && !user.hips)) {
        return {
           recommendedSize: null,
           confidenceScore: 0,
           returnProbability: 50,
           reasons: ["Complete your Profile to unlock predictive fit insights."]
        };
    }
    
    let bestSize = null;
    let minDelta = Infinity;
    let bestReasons: string[] = [];
    let bestConfidence = 0;
    
    for (const size of product.sizes) {
        const spec = product.sizeMeasurements[size];
        if (!spec) continue;
        
        let localDelta = 0;
        let diffs = [];
        
        // Add realistic Ease Allowances (Clothes must be 8-10cm larger than body for standard fit)
        const targetChest = user.chest ? parseFloat(user.chest) + 10 : null;
        const targetWaist = user.waist ? parseFloat(user.waist) + 8 : null;
        const targetHips = user.hips ? parseFloat(user.hips) + 8 : null;
        
        if (targetChest && spec.chest) {
           const d = spec.chest - targetChest; // Positive means garment is larger
           localDelta += Math.abs(d);
           if (Math.abs(d) <= 3) diffs.push("Chest is a perfect match.");
           else if (d < -3) diffs.push("Chest will be slightly tight.");
           else diffs.push("Chest will offer comfortable breathing room.");
        }
        
        if (targetWaist && spec.waist) {
           const d = spec.waist - targetWaist;
           localDelta += Math.abs(d) * 1.5; // Waist is a high-confidence return vector
           if (Math.abs(d) <= 3) diffs.push("Waist fits comfortably.");
           else if (d < -3) diffs.push("Waist may feel constrictive.");
           else diffs.push("Waist is casually loose.");
        }
        
        if (targetHips && spec.hips) {
           const d = spec.hips - targetHips;
           localDelta += Math.abs(d);
           if (Math.abs(d) <= 3) diffs.push("Hips align perfectly.");
        }

        if (user.thigh && spec.thigh) {
           const targetThigh = parseFloat(user.thigh) + 6;
           const d = spec.thigh - targetThigh;
           localDelta += Math.abs(d) * 0.5; 
           if (d < -3) diffs.push("Leg volume will be slightly tight.");
           else diffs.push("Excellent baggy leg volume.");
        }

        if (user.inseam && spec.inseam) {
           const d = parseFloat(user.inseam) - spec.inseam;
           localDelta += Math.abs(d) * 0.8;
           if (Math.abs(d) <= 2.5) diffs.push("Length is mathematically perfect.");
           else if (d > 0) diffs.push("Legs may be slightly short.");
           else diffs.push("Stylish stacked length.");
        }
        
        if (localDelta < minDelta) {
            minDelta = localDelta;
            bestSize = size;
            bestReasons = diffs;
            bestConfidence = Math.max(20, 100 - (localDelta * 2));
        }
    }
    
    // Risk roughly inverses confidence
    const risk = Math.max(1, 100 - bestConfidence);
    
    return {
        recommendedSize: bestSize,
        confidenceScore: Math.round(bestConfidence),
        returnProbability: Math.round(risk),
        reasons: bestReasons.slice(0, 3) // Return top 3 insights
    };
}

/**
 * Extracts return probabilities for items structurally placed inside the user's cart against their user profile.
 */
export function evaluateCartItemFit(product: Product, selectedSize: string, user: FitMeasurements) {
     if (!product.sizeMeasurements || !product.sizeMeasurements[selectedSize] || (!user.chest && !user.waist)) {
        return {
           confidenceScore: 50,
           returnProbability: 35, // Average baseline without predictive intelligence
           reasons: ["Insufficient predictive tracking data."]
        };
     }
     
     const spec = product.sizeMeasurements[selectedSize];
     let localDelta = 0;
     let severityFlag = 0; // Heavily penalize items > 2 standard deviations off to spike return probability
     
     const targetChest = user.chest ? parseFloat(user.chest) + 10 : null;
     const targetWaist = user.waist ? parseFloat(user.waist) + 8 : null;
     
     if (targetChest && spec.chest) {
         const cd = Math.abs(targetChest - spec.chest);
         localDelta += cd;
         if (cd > 6) severityFlag += 25;
     }
     if (targetWaist && spec.waist) {
         const wd = Math.abs(targetWaist - spec.waist);
         localDelta += wd * 1.5;
         if (wd > 5) severityFlag += 40; 
     }
     
     const conf = Math.max(5, 100 - (localDelta * 3));
     const risk = Math.min(96, (100 - conf) * 1.2 + severityFlag);
     
     return {
         confidenceScore: Math.round(conf),
         returnProbability: Math.round(risk),
     };
}
