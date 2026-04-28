"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UploadCloud, CheckCircle2, Ruler, Plus, ShieldCheck, Trash2, Search, Wand2, Loader2, Activity } from "lucide-react";
import { predictSize } from "@/lib/actions/ml.actions";

import { useFitProfile } from "@/lib/useFitProfile";

export default function ProfileManagement() {
  const { user, isLoaded } = useUser();
  const { measurements, saveMeasurements: setMeasurements } = useFitProfile();

  // AI Fit Generator States
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  
  // Visual Model Form
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [sideImage, setSideImage] = useState<File | null>(null);
  const [visualStatus, setVisualStatus] = useState<string>("");
  const [visualResults, setVisualResults] = useState<{ [key: string]: string } | null>(null);

  const SUGGESTIONS = [
    { brand: "Nike", type: "T-Shirt", size: "Medium", chest: "39", waist: "32", hips: "39", inseam: "31", height: "178", weight: "75" },
    { brand: "Levi's", type: "Jeans", size: "32x32", chest: "40", waist: "33", hips: "41", inseam: "32", height: "180", weight: "78" },
    { brand: "Adidas", type: "Track Jacket", size: "Large", chest: "42", waist: "34", hips: "41", inseam: "31", height: "182", weight: "82" },
    { brand: "H&M", type: "Slim Shirt", size: "Small", chest: "36", waist: "30", hips: "37", inseam: "29", height: "170", weight: "65" },
    { brand: "Zara", type: "Polo", size: "Medium", chest: "38", waist: "31", hips: "39", inseam: "30", height: "175", weight: "72" }
  ];

  const filteredSuggestions = SUGGESTIONS.filter(s => 
    searchQuery && (s.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectBrand = async (suggestion: typeof SUGGESTIONS[0]) => {
    setSearchQuery(`${suggestion.brand} ${suggestion.type} (${suggestion.size})`);
    setShowSuggestions(false);
    setIsPredicting(true);
    
    // Call the actual Smart Size Recommender (Model 3)
    const res = await predictSize(
        parseFloat(suggestion.weight),
        parseFloat(suggestion.height),
        30, // Default age Since UI doesn't have it explicitly right now
        suggestion.brand
    );
    
    setIsPredicting(false);
    if (res.success && typeof res.final_size === 'string') {
        const fakeWaitScale = 1.0; 
        setMeasurements({
            // Fallback to suggestion baseline if API just returns standard size strings
            height: suggestion.height,
            weight: suggestion.weight,
            chest: (parseFloat(suggestion.chest) * fakeWaitScale).toString(),
            waist: (parseFloat(suggestion.waist) * fakeWaitScale).toString(),
            hips: suggestion.hips,
            inseam: suggestion.inseam,
            hasUsedAi: true
        });
        alert(`Model 3 predicted your size is: ${res.final_size}\nReason: ${res.reason}`);
    } else {
        // Fallback
        setMeasurements({
          height: suggestion.height,
          weight: suggestion.weight,
          chest: suggestion.chest,
          waist: suggestion.waist,
          hips: suggestion.hips,
          inseam: suggestion.inseam,
          hasUsedAi: true
        });
    }
  };

  const handleVisualAnalysis = async () => {
     if (!frontImage) {
         alert("Front View is required for Model 3 Extra analysis.");
         return;
     }
     setVisualStatus("Analyzing Body Geometry...");
     const formData = new FormData();
     formData.append("front_image", frontImage);
     if (sideImage) formData.append("side_image", sideImage);
     formData.append("user_height", measurements.height);

     try {
       const apiEndpoint = process.env.NEXT_PUBLIC_ML_PHOTO_URL || "http://localhost:8002/analyze";
       const response = await fetch(apiEndpoint, {
         method: "POST",
         body: formData,
       });

       setVisualStatus("");
       
       if (response.ok) {
          const res = await response.json();
          setMeasurements({
             ...measurements,
             chest: res.measurements.chest?.toString() || measurements.chest,
             waist: res.measurements.waist?.toString() || measurements.waist,
             hips: res.measurements.hips?.toString() || measurements.hips,
             inseam: res.measurements.inseam?.toString() || measurements.inseam,
             hasUsedAi: true
          });
          
          // Store explicit findings for the UI display block (omitting weight intentionally)
          const displayData = { ...res.measurements };
          delete displayData.weight;
          setVisualResults(displayData);
       } else {
          const errText = await response.text();
          console.error("Backend 500 output:", errText);
          alert("Visual AI Engine crashed on inference. Check Python console.");
       }
     } catch (err) {
        setVisualStatus("");
        alert("Failed to connect to local visual model (Make sure localhost:8002 is running!)");
     }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans text-black">
      <Navbar />
      <div className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-4xl font-extrabold mb-2 uppercase tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Profile Settings
        </h1>
        <p className="text-black/60 mb-10 text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Manage your profile, measurements, and fit preferences.
        </p>

        <div className="space-y-8">
          
          {/* Section 1: Avatar / Full Body Image Upload */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/10 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">Model 3 Extra</span>
            </div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-black/60" /> Visual Fit Body Measurement
            </h2>
            <p className="text-sm text-black/60 mb-2">Upload full-body images for FitAI multi-model intelligence.</p>
            <p className="text-xs font-bold text-amber-600 mb-6 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
               Note: Use fit clothes and expand the hand freely for more accuracy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4">
              <div className="flex-1 border-2 border-dashed border-black/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-black/50 transition-colors">
                <UploadCloud className="w-6 h-6 text-black/40 mb-2" />
                <span className="text-sm font-bold text-black">Upload Frontend (Front View)</span>
                <input type="file" className="text-xs mt-2 w-[180px]" onChange={(e) => setFrontImage(e.target.files?.[0] || null)} />
              </div>
              <div className="flex-1 border-2 border-dashed border-black/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-black/50 transition-colors">
                <UploadCloud className="w-6 h-6 text-black/40 mb-2" />
                <span className="text-sm font-bold text-black">Upload Backend (Back/Side View)</span>
                <input type="file" className="text-xs mt-2 w-[180px]" onChange={(e) => setSideImage(e.target.files?.[0] || null)} />
              </div>
            </div>
            
            <div className="mb-6 flex flex-col gap-2 bg-black/5 p-4 rounded-xl border border-black/10">
               <label className="text-sm font-bold text-black uppercase tracking-widest flex items-center gap-2">
                 <Ruler className="w-4 h-4" /> Your Height (cm) <span className="text-red-500">*</span>
               </label>
               <input 
                 type="number" 
                 value={measurements.height}
                 onChange={(e) => setMeasurements({...measurements, height: e.target.value})}
                 placeholder="e.g. 175"
                 className="w-full max-w-[200px] border border-black/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black/50 bg-white"
               />
               <p className="text-xs text-black/60 font-medium">Height acts as the mandatory mathematical anchor for aligning the Computer Vision 33-point pipeline.</p>
            </div>
            
            <button 
               onClick={handleVisualAnalysis} 
               disabled={!frontImage || !measurements.height || visualStatus !== ""}
               className="bg-[#1B1B1D] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-black/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {visualStatus ? <><Loader2 className="w-4 h-4 animate-spin" /> {visualStatus}</> : "Run Model 3 Extra AI Analysis"}
            </button>
            
            {visualResults && (
              <div className="mt-6 p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
                 <h4 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2"><Activity size={16} /> AI Body Extraction Complete</h4>
                 <div className="grid grid-cols-2 gap-3">
                    {Object.entries(visualResults).map(([key, value]) => (
                      <div key={key} className="bg-white px-4 py-2 rounded border border-indigo-50 flex justify-between items-center">
                         <span className="text-xs uppercase font-bold text-indigo-400">{key}</span>
                         <span className="text-sm font-black text-indigo-700">{value}</span>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>

          {/* Section 2: Measurements Setup */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-black/10 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-black/60" /> Fit Measurements <span className="text-xs font-normal text-black/40 ml-2">(Optional)</span>
            </h2>
            <p className="text-sm text-black/60 mb-6">Optionally add your exact body measurements to drastically improve AI fit recommendations across brands.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
              {[
                { label: "Height", suffix: "cm", key: "height" },
                { label: "Weight", suffix: "kg", key: "weight" },
                { label: "Chest", suffix: "cm", key: "chest" },
                { label: "Waist", suffix: "cm", key: "waist" },
                { label: "Hips", suffix: "cm", key: "hips" },
                { label: "Inseam", suffix: "cm", key: "inseam" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-black/70 uppercase tracking-widest">{field.label}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="--"
                      className="w-full bg-[#f9f9f9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition-colors"
                      value={measurements[field.key as keyof typeof measurements]}
                      onChange={(e) => setMeasurements({ ...measurements, [field.key]: e.target.value })}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-black/30">{field.suffix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: AI Brand Sizing Model */}
          <div className="bg-white rounded-[24px] p-8 border border-black/10 shadow-sm overflow-visible relative">
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">Model 3</span>
            </div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-black/60" /> Smart Size Recommender
            </h2>
            <p className="text-sm text-black/60 mb-6">Type a brand and clothing type you typically wear. Our AI will automatically predict your true body measurements using Model 3 logic.</p>

            <div className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-black/40" />
                <input 
                  type="text" 
                  placeholder="e.g. Nike T-Shirt Medium" 
                  className="w-full bg-[#f9f9f9] border border-black/10 rounded-xl pl-12 pr-12 py-4 text-sm font-medium focus:outline-none focus:border-black/30 transition-all focus:ring-4 focus:ring-black/5"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {isPredicting && (
                  <Loader2 className="absolute right-4 w-5 h-5 text-black animate-spin" />
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-xl border border-black/10 shadow-xl overflow-hidden py-2">
                  <div className="px-4 py-2 text-[10px] font-bold text-black/40 uppercase tracking-widest bg-black/5 mb-1">
                    AI Suggestions
                  </div>
                  {filteredSuggestions.map((s, idx) => (
                    <div 
                      key={idx}
                      className="px-4 py-3 hover:bg-black/5 cursor-pointer flex items-center justify-between transition-colors group"
                      onClick={() => handleSelectBrand(s)}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-black">{s.brand} {s.type}</span>
                        <span className="text-xs text-black/50">Predicts exact fitting dimensions</span>
                      </div>
                      <span className="text-xs font-bold bg-[#f0f0f0] px-3 py-1 rounded-md group-hover:bg-black group-hover:text-white transition-colors">
                        Size {s.size}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isPredicting && (
              <div className="mt-6 flex items-center gap-3 bg-[#F0EEED] text-black font-semibold text-sm px-6 py-4 rounded-xl border border-black/5 animate-pulse">
                <Wand2 className="w-5 h-5 text-black" />
                <span>AI is calculating your exact fit dimensions...</span>
              </div>
            )}
          </div>

          <div className="flex justify-start sm:justify-end pt-4 pb-10">
            <button 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B1B1D] text-white px-10 py-4 rounded-full font-bold hover:bg-black/80 transition-transform hover:scale-[1.02] shadow-xl shadow-black/10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => alert("Profile set up successfully! AI fit model updated.")}
            >
              <CheckCircle2 className="w-5 h-5" />
              Setup Profile
            </button>
          </div>
          
        </div>
      </div>
      <Footer />
    </main>
  );
}
