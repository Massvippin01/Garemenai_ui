"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useFitProfile } from "@/lib/useFitProfile";
import { PRODUCTS } from "@/lib/data";
import { recommendBestSize } from "@/lib/fitEngine";
import { Activity, Database, Server, Terminal, Lock, History, ScanFace } from "lucide-react";
import Footer from "@/components/Footer";

export default function IntelligenceDashboard() {
  const { measurements, mounted } = useFitProfile();
  const [selectedProduct, setSelectedProduct] = useState(Object.keys(PRODUCTS)[0]);
  
  const [envStatus, setEnvStatus] = useState<any>({});

  useEffect(() => {
    // Only available on the client after mount
    setEnvStatus({
      computeNode: process.env.NEXT_PUBLIC_ML_COMPUTE_NODE_URL || "Not Configured (Edge Mode)",
    });
  }, []);

  const productParams = PRODUCTS[selectedProduct];
  const simulation = mounted && productParams ? recommendBestSize(productParams, measurements) : null;

  if (!mounted) return <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">Loading Intelligence Data...</div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-black selection:text-white">
      <Navbar />
      
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10 border-b border-black/10 pb-6">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>AI Administration</h1>
            <p className="text-black/50 text-sm font-medium">RESTRICTED ACCESS // AI Fit Logic Debugger & Environment Status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Module 1: LocalStorage Fit Profile Tracker */}
          <div className="bg-white border border-black/10 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <Database className="w-5 h-5 text-indigo-500" /> Current Fit Memory
            </h2>
            <p className="text-sm text-black/60 mb-6 font-medium">Real-time parameters injected via checkout or local measurement tools.</p>
            
            <div className="bg-[#F9F9F9] rounded-xl p-5 border border-black/5 flex flex-col gap-3">
              {Object.entries(measurements).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center border-b border-black/5 pb-2 last:border-b-0 last:pb-0">
                  <span className="text-black/50 uppercase text-xs font-bold tracking-widest">{key}</span>
                  <span className="text-black font-bold font-mono bg-black/5 px-2 py-1 rounded text-sm">{val || "NULL"}</span>
                </div>
              ))}
            </div>
            {Object.values(measurements).every(x => !x) && (
              <p className="text-xs text-red-500 mt-4 font-bold bg-red-50 p-3 rounded-lg">Alert: Profile empty. Predictive intelligence is currently dormant.</p>
            )}
          </div>

          {/* Module 2: Historical Measurement Tracking (New) */}
          <div className="bg-white border border-black/10 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <History className="w-5 h-5 text-amber-500" /> Historical Tracking
            </h2>
            <p className="text-sm text-black/60 mb-6 font-medium">Autonomous tracking of historical shifts in physical measurements.</p>
            
            <ul className="space-y-4">
              <li className="flex gap-4">
                 <div className="w-2 h-10 bg-amber-500/20 rounded-full overflow-hidden flex flex-col justify-between">
                    <div className="w-full h-1/2 bg-amber-500"></div>
                 </div>
                 <div>
                   <p className="text-sm font-bold">Base Profile Initialized</p>
                   <p className="text-xs text-black/40">Initial setup on Desktop Client</p>
                 </div>
              </li>
              <li className="flex gap-4">
                 <div className="w-2 h-10 bg-black/5 rounded-full overflow-hidden flex flex-col justify-end">
                    <div className="w-full h-1/3 bg-black/20"></div>
                 </div>
                 <div>
                   <p className="text-sm font-bold">Purchased Skinny Fit Jeans</p>
                   <p className="text-xs text-black/40">Waist dimensions auto-corrected from 32 &rarr; 33cm.</p>
                 </div>
              </li>
              <li className="flex gap-4 items-center">
                 <span className="text-xs font-bold bg-black/5 text-black/40 px-3 py-1 rounded-full uppercase tracking-widest">Awaiting new data</span>
              </li>
            </ul>
          </div>

          {/* Module 3: Virtual/Visual AI Analytics (V.I.A) (New) */}
          <div className="bg-white border border-black/10 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <ScanFace className="w-5 h-5 text-pink-500" /> Visual Intelligence Analysis (VIA)
            </h2>
            <p className="text-sm text-black/60 mb-6 font-medium">Monitoring the underlying PyTorch Computer Vision parameters.</p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="border border-black/5 bg-[#F9F9F9] rounded-xl p-4">
                <span className="block text-xs font-bold text-black/40 uppercase mb-1">Landmarks Mapped</span>
                <span className="text-2xl font-black text-black">33 / 33</span>
              </div>
              <div className="border border-black/5 bg-[#F9F9F9] rounded-xl p-4">
                <span className="block text-xs font-bold text-black/40 uppercase mb-1">Confidence</span>
                <span className="text-2xl font-black text-pink-500">89.4%</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
               <span className="text-xs font-bold text-indigo-800 uppercase">Latest Image Process:</span>
               <p className="text-sm text-indigo-900/70 mt-1">Skeletal landmarks mapped successfully on last user upload. Volumes extracted correctly using anchor height.</p>
            </div>
          </div>

          {/* Module 4: Environment Tunnels */}
          <div className="bg-white border border-black/10 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <Server className="w-5 h-5 text-teal-500" /> Edge Neural Tunnels
            </h2>
            <p className="text-sm text-black/60 mb-6 font-medium">The single Unified Fast API Gateway securely redirecting traffic to local PyTorch memory cores.</p>
            
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-[#F9F9F9] p-4 rounded-xl border border-black/5 shadow-sm">
                <span className="text-black font-bold uppercase tracking-widest block mb-1">Central ML Compute Node (Port 8080)</span>
                <span className="text-black/60 break-all font-mono">{envStatus.computeNode}</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 mt-4">
                 <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest">Internal Thread Routing:</span>
                 <ul className="text-emerald-900/70 text-sm mt-2 space-y-1 font-medium">
                    <li>&rarr; Recommender Service</li>
                    <li>&rarr; Photo CV Engine</li>
                    <li>&rarr; Sentiment Processor</li>
                 </ul>
              </div>
            </div>
          </div>

          {/* Module 5: Physics Engine Sandbox */}
          <div className="lg:col-span-2 bg-white border border-black/10 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <Terminal className="w-5 h-5 text-black" /> Predictive Fit Sandbox
            </h2>
            <p className="text-sm text-black/60 mb-6 font-medium">Test the core `recommendBestSize()` physics manually.</p>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-black/50 uppercase tracking-widest block mb-2">Target Item ID</label>
                  <select 
                    className="w-full bg-[#F9F9F9] border border-black/10 text-black font-medium text-sm p-4 rounded-xl outline-none focus:border-black/30 transition-colors"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {Object.keys(PRODUCTS).map(id => (
                      <option key={id} value={id}>{PRODUCTS[id].name} ({id})</option>
                    ))}
                  </select>
                </div>
                
                <div className="p-5 border border-black/5 bg-[#F9F9F9] rounded-xl mt-auto">
                  <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-3">Algorithm Math</p>
                  <ul className="text-sm text-black/70 space-y-2 font-medium">
                    <li className="flex justify-between items-center bg-white p-2 border border-black/5 rounded"><span>Match </span><span className="font-bold text-black">{`<=`} 2.5cm</span></li>
                    <li className="flex justify-between items-center bg-white p-2 border border-black/5 rounded"><span>Tight </span><span className="font-bold text-black">{`>`} 2.5cm</span></li>
                    <li className="flex justify-between items-center bg-white p-2 border border-black/5 rounded"><span>Waist Penalty </span><span className="font-bold text-black">1.5x</span></li>
                  </ul>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 bg-black text-white rounded-[20px] p-8 relative overflow-hidden flex flex-col shadow-xl">
                <div className="absolute top-0 right-0 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/50 rounded-bl-xl backdrop-blur-sm">OUTPUT ENGINE</div>
                
                {simulation ? (
                  <div className="space-y-6 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                      <span className="text-sm text-white/50 font-medium">Selected Size Target</span>
                      <span className="text-3xl font-black text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{simulation.recommendedSize || "NULL"}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div>
                         <span className="text-xs font-bold uppercase tracking-widest block text-white/40 mb-1">Confidence</span>
                         <span className="text-3xl font-black text-green-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{simulation.confidenceScore}%</span>
                      </div>
                      <div>
                         <span className="text-xs font-bold uppercase tracking-widest block text-white/40 mb-1">Return Risk</span>
                         <span className={`text-3xl font-black ${simulation.returnProbability > 25 ? "text-red-400" : "text-amber-400"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{simulation.returnProbability}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest block text-white/40 mb-3">Behavioral Log Traces</span>
                      {simulation.reasons.length > 0 ? (
                        <ul className="flex flex-col gap-2">
                          {simulation.reasons.map((r, i) => (
                            <li key={i} className="bg-white/10 text-sm py-2 px-4 rounded border border-white/10 flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm text-red-400 bg-red-400/10 p-3 rounded block border border-red-400/20">Failed to pull mathematical data. Measurements may be incomplete.</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-sm text-white/30 gap-3">
                    <Activity className="w-8 h-8 animate-pulse opacity-50" />
                    Awaiting computational payload...
                  </div>
                )}
              </div>
            </div>
            
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
