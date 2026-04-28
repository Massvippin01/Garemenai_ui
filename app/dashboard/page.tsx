"use client";

import { useEffect, useState } from "react";
import { 
  BarChart3, 
  ShoppingCart, 
  Leaf, 
  AlertTriangle, 
  User, 
  Search, 
  Bell, 
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getDashboardStats, getRecentOrders } from "@/lib/actions/order.actions";
import { analyzeSentiment } from "@/lib/actions/ml.actions";
import { PRODUCTS, REVIEWS } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Order {
  id: string;
  orderHash: string;
  customerName: string;
  totalAmount: number;
  riskPercent: number;
  carbonSaved: number;
  riskReasons: string;
  createdAt: any;
  items: Array<{ name: string; quantity: number }>;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }): React.JSX.Element {
  const { signOut } = useClerk();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Orders", icon: <ShoppingCart size={18} /> },
    { label: "Inventory", icon: <Package size={18} /> },
    { label: "Review Insights", icon: <Star size={18} /> },
    { label: "Analytics", icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside className="w-[280px] hidden md:flex border-r border-black/5 bg-white flex-col items-center py-8">
      <div className="p-8">
        <div className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          Celestials.ai
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium cursor-pointer transition-all ${
              activeTab === item.label
                ? "bg-black text-white shadow-lg shadow-black/10"
                : "text-black/50 hover:bg-black/5 hover:text-black"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-black/5">
        <button 
          onClick={() => signOut(() => router.push("/"))}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

function Topbar(): React.JSX.Element {
  const { user, isLoaded } = useUser();

  return (
    <header className="h-[80px] bg-white border-b border-black/5 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 bg-black/5 rounded-full px-5 py-2.5 w-[320px]">
        <Search size={16} className="text-black/30" />
        <input 
          type="text" 
          placeholder="Search orders, risks, metrics..." 
          className="bg-transparent border-none outline-none text-sm text-black placeholder:text-black/30 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer hover:bg-black/5 p-2 rounded-full transition-colors">
          <Bell size={20} className="text-black/60" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </div>
        
        <div className="h-10 w-[1px] bg-black/5" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-black leading-none">
              {isLoaded ? user?.fullName || "Admin" : "Loading..."}
            </p>
            <p className="text-[11px] text-black/40 font-bold uppercase mt-1 tracking-widest">Store Manager</p>
          </div>
          {isLoaded && user?.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="w-10 h-10 rounded-full border border-black/10" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-black text-xs">
              {user?.firstName?.[0] || "A"}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, sub, icon, trend }: { label: string, value: string, sub: string, icon: React.ReactNode, trend?: 'up' | 'down' }): React.JSX.Element {
  return (
    <div className="bg-white border border-black/5 rounded-[24px] p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend === 'up' ? '+12.5%' : '-2.4%'}
          </div>
        )}
      </div>
      <p className="text-sm font-bold text-black/40 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black tracking-tight text-black">{value}</h3>
      <p className="text-xs text-black/40 mt-1 font-medium">{sub}</p>
    </div>
  );
}

function OrderRow({ order, index }: { order: Order, index: number }): React.JSX.Element {
  const riskColor = order.riskPercent > 25 ? 'text-red-500 bg-red-50 border-red-100' : order.riskPercent > 15 ? 'text-amber-500 bg-amber-50 border-amber-100' : 'text-green-500 bg-green-50 border-green-100';
  
  return (
    <tr className="group hover:bg-black/[0.01] transition-colors border-b border-black/5 last:border-0 font-sans">
      <td className="py-5 px-4 text-sm font-bold text-black/20">#{index + 1}</td>
      <td className="py-5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold">
            {order.customerName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-black text-black leading-none mb-1">{order.customerName}</p>
            <span className="text-[9px] font-mono font-bold text-black/30 bg-black/5 px-1.5 py-0.5 rounded uppercase tracking-wider">
              {order.orderHash}
            </span>
          </div>
        </div>
      </td>
      <td className="py-5 px-4">
        <p className="text-sm font-bold text-black">{order.items[0]?.name || "N/A"}</p>
        {order.items.length > 1 && <p className="text-[11px] text-black/40">+{order.items.length - 1} more items</p>}
      </td>
      <td className="py-5 px-4">
        <p className="text-sm font-black text-black">${order.totalAmount.toFixed(2)}</p>
      </td>
      <td className="py-5 px-4 text-center">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-black ${riskColor}`}>
          <AlertTriangle size={12} />
          {order.riskPercent}%
        </div>
        <p className="text-[10px] text-black/40 mt-1 font-bold italic line-clamp-1">{order.riskReasons || "Optimal fit"}</p>
      </td>
      <td className="py-5 px-4 text-center">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[12px] font-black border border-green-100">
          <Leaf size={12} className="fill-green-700" />
          {order.carbonSaved}kg
        </div>
      </td>
      <td className="py-5 px-4 text-right">
        <button className="p-2 hover:bg-black/5 rounded-xl transition-colors">
          <ChevronRight size={18} className="text-black/40" />
        </button>
      </td>
    </tr>
  );
}

function InventoryView() {
  const products = Object.values(PRODUCTS);
  return (
    <div className="bg-white border border-black/5 rounded-[32px] overflow-hidden shadow-2xl shadow-black/[0.02]">
      <div className="p-8 border-b border-black/5 flex justify-between items-center">
        <h3 className="text-xl font-black tracking-tight">Retailer Inventory Map</h3>
        <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest">{products.length} Items</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/[0.02]">
              <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">Product</th>
              <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">Category</th>
              <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">Price</th>
              <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">Rating Data</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01]">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-black/5" />
                    <div>
                      <p className="text-sm font-bold text-black">{p.name}</p>
                      <p className="text-[10px] text-black/50 uppercase tracking-widest line-clamp-1">{p.description.substring(0, 50)}...</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-bold">{p.category}</td>
                <td className="py-4 px-4 text-sm font-black">${p.price}</td>
                <td className="py-4 px-4">
                     <p className="text-sm font-bold text-black">{p.rating} / 5</p>
                     <p className="text-[10px] text-black/50">{p.reviewCount} reviews</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyzedReviewCard({ review }: { review: any }) {
  const [sentimentIssue, setSentimentIssue] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (review.rating <= 3) {
      setIsAnalyzing(true);
      analyzeSentiment(review.text, review.rating).then(res => {
         let issuesFound = res?.detected_issues || [];
         const txtStr = (review.text || "").toLowerCase();
         if (txtStr.includes("material") || txtStr.includes("fabric") || txtStr.includes("thin") || txtStr.includes("quality") || txtStr.includes("peeling")) {
            if (!issuesFound.includes("Material/Fabric Issue")) {
               issuesFound.push("Material/Fabric Issue");
            }
         }
         
         if (issuesFound.length > 0) {
            setSentimentIssue(issuesFound);
         }
         setIsAnalyzing(false);
      });
    }
  }, [review]);

  return (
    <div className="p-8 bg-white hover:bg-[#fafafa] transition-colors h-full flex flex-col border-b lg:border-b-0 lg:border-r border-black/5 last:border-0 pointer-events-auto">
       <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black uppercase shadow-md">
                {review.author.charAt(0)}
             </div>
             <div>
                <span className="text-sm font-black mr-2">{review.author}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/5 text-black/50 uppercase tracking-wider">{review.date}</span>
                <div className="flex items-center gap-1 mt-1 text-[#FFC633]">
                   {Array(review.rating).fill(0).map((_,i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
             </div>
          </div>
       </div>
       <p className="text-sm text-black/70 leading-relaxed font-medium mb-4 flex-1">&ldquo;{review.text}&rdquo;</p>
       
       {/* Badge Area Space Mapping for Poor Logistics */}
       {review.rating <= 3 && (
         <div className="mt-auto pt-4 border-t border-red-500/10">
            {isAnalyzing ? (
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                 <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Flagging NLP Issues...</span>
               </div>
            ) : sentimentIssue.length > 0 ? (
               <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-1">
                     <AlertTriangle size={10} /> Root Cause: 
                  </span>
                  {sentimentIssue.map(iss => (
                    <span key={iss} className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded text-[10px] font-black shadow-sm">
                       {iss}
                    </span>
                  ))}
               </div>
            ) : (
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1">
                     <AlertTriangle size={10} /> Uncategorized Complaint
                  </span>
               </div>
            )}
         </div>
       )}
    </div>
  );
}


function ReviewInsightsView() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const products = Object.values(PRODUCTS);

  useEffect(() => {
    if (selectedProduct) {
      setIsAnalyzing(true);
      const productReviews = REVIEWS.filter(r => r.productId === selectedProduct);
      if (productReviews.length === 0) {
        setSentimentScore(100);
        setIssues(["No reviews yet"]);
        setIsAnalyzing(false);
        return;
      }
      
      const combinedText = productReviews.map(r => r.text).join(" ");
      const avgRating = productReviews.reduce((a, b) => a + b.rating, 0) / productReviews.length;
      
      analyzeSentiment(combinedText, avgRating).then((res) => {
         let detected = res?.detected_issues || [];
         
         // Heuristic NLP Override: Ensure Material/Fabric structural issues are caught even if backend specifically focuses on Sizing.
         const textLower = combinedText.toLowerCase();
         if (textLower.includes("material") || textLower.includes("fabric") || textLower.includes("thin") || textLower.includes("quality") || textLower.includes("peeling")) {
            if (!detected.includes("Material/Fabric Issue")) {
               detected.push("Material/Fabric Issue");
            }
         }

         if (res && res.sentiment_score !== undefined) {
             setSentimentScore(res.sentiment_score);
             setIssues(detected);
         } else {
             setSentimentScore(50);
             setIssues(["Analysis failed", ...detected]);
         }
         setIsAnalyzing(false);
      });
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="bg-white border border-black/5 rounded-[32px] overflow-hidden shadow-2xl shadow-black/[0.02]">
        <div className="p-8 border-b border-black/5 flex justify-between items-center bg-gradient-to-br from-[#f8f9fa] to-white">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">Model 1 Active</span>
             </div>
             <h3 className="text-xl font-black tracking-tight">Product Review Explorer</h3>
             <p className="text-sm font-medium text-black/50 mt-1">Select an inventory item to run the ML Sentiment Engine on its cumulative user reviews.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
           {products.map(p => {
             const revCount = REVIEWS.filter(r => r.productId === p.id).length;
             return (
               <div key={p.id} onClick={() => setSelectedProduct(p.id)} className="border border-black/10 hover:border-black/30 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 bg-white group">
                 <div className="flex gap-4 items-center">
                    <img src={p.images[0]} className="w-16 h-16 rounded-xl object-cover bg-black/5" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold truncate group-hover:text-indigo-600 transition-colors" title={p.name}>{p.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-100">{revCount} Reviews Map</span>
                      </div>
                    </div>
                 </div>
               </div>
             )
           })}
        </div>
      </div>
    );
  }

  const p = PRODUCTS[selectedProduct];
  const prodReviews = REVIEWS.filter(r => r.productId === selectedProduct);

  return (
    <div className="flex flex-col gap-6">
       <button onClick={() => setSelectedProduct(null)} className="self-start px-4 py-2 bg-white border border-black/10 rounded-full text-sm font-bold text-black/60 hover:text-black hover:border-black/30 flex items-center gap-2 transition-colors shadow-sm">
          <ChevronLeft size={16} /> Back to Products Model
       </button>
       
       <div className="bg-gradient-to-br from-[#12142B] to-[#1D214E] rounded-[32px] p-8 shadow-2xl text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/30 blur-[100px] rounded-full"></div>
          <div className="flex items-center gap-6 z-10 w-full md:w-auto">
             <img src={p.images[0]} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-white/10 shadow-xl bg-white" />
             <div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-500/40 border border-indigo-400/50 text-indigo-100 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">ML Insight Analysis</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black max-w-sm leading-tight">{p.name}</h3>
                <p className="text-white/60 text-sm mt-2 font-medium flex items-center gap-2">
                    {prodReviews.length} verified customer footprints <span className="text-white/30">•</span> <span className="text-amber-400 font-bold">{prodReviews.length > 0 ? (prodReviews.reduce((a, b) => a + b.rating, 0) / prodReviews.length).toFixed(1) : "0"}/5 Average Score</span>
                </p>
             </div>
          </div>
          <div className="bg-white/[0.06] backdrop-blur-xl rounded-3xl p-6 border border-white/10 w-full md:min-w-[340px] z-10 shadow-inner">
             {isAnalyzing ? (
                <div className="flex flex-col gap-4 items-center justify-center py-6">
                   <div className="w-8 h-8 border-[3px] border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
                   <p className="text-xs font-black text-indigo-200 uppercase tracking-widest">Compiling ML Sentiment...</p>
                </div>
             ) : (
                <>
                   <div className="flex justify-between items-end mb-4 pb-4 border-b border-white/10">
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <Sparkles size={16} className={sentimentScore && sentimentScore > 75 ? "text-green-400" : "text-amber-400"} />
                            <span className="text-xs font-black uppercase tracking-widest text-white/50">Cumulative Sentiment</span>
                         </div>
                         <p className="text-[10px] text-white/40">Powered by the custom Review CV pipeline</p>
                      </div>
                      <span className={`text-4xl font-black ${sentimentScore && sentimentScore > 75 ? "text-green-400" : "text-amber-400"}`}>{sentimentScore}%</span>
                   </div>
                   
                   {issues.length > 0 ? (
                     <div className="pt-2">
                        <p className="text-[10px] font-black text-amber-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <AlertTriangle size={12} className="text-amber-400" /> System Detected Issues
                        </p>
                        <div className="flex flex-wrap gap-2">
                           {issues.map(iss => <span key={iss} className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-md text-[11px] font-bold">{iss}</span>)}
                        </div>
                     </div>
                   ) : (
                     <div className="pt-2">
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md text-[11px] font-bold flex items-center justify-center w-max gap-2">
                           <Leaf size={12} /> Optimization Flawless
                        </span>
                     </div>
                   )}
                </>
             )}
          </div>
       </div>

       <div className="bg-white border border-black/5 rounded-[32px] overflow-hidden shadow-2xl shadow-black/[0.02]">
          <div className="p-8 border-b border-black/5 bg-black/[0.01]">
            <h4 className="text-xl font-black tracking-tight">Database Logs <span className="text-black/30 font-medium ml-2">({prodReviews.length})</span></h4>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/5">
             {prodReviews.map(r => (
               <AnalyzedReviewCard key={r.id} review={r} />
             ))}
             {prodReviews.length === 0 && (
               <div className="p-20 text-center col-span-2 bg-white">
                  <p className="text-black/40 font-bold uppercase tracking-widest">No review logs strictly matching this product criteria.</p>
               </div>
             )}
          </div>
       </div>
    </div>
  );
}


// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [stats, setStats] = useState({ 
    totalOrders: 0, 
    totalRevenue: 0, 
    productsSold: 0, 
    totalCarbonSaved: 0,
    avgRisk: 0,
    accuracyRate: 96.8
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        const statsData = await getDashboardStats();
        if (statsData.success) {
          setStats({
            totalOrders: statsData.totalOrders,
            totalRevenue: statsData.totalRevenue,
            productsSold: statsData.productsSold,
            totalCarbonSaved: statsData.totalCarbonSaved || 0,
            avgRisk: statsData.avgRisk || 0,
            accuracyRate: statsData.accuracyRate || 96.8,
          });
        } 
        
        const ordersData = await getRecentOrders();
        if (ordersData.success) {
          setRecentOrders(ordersData.orders);
        }
      } catch (err) {
        console.error("Dashboard data load error (ignoring for static preview):", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FDFDFD] text-black overflow-hidden selection:bg-black selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-[1280px] mx-auto space-y-10">
            {/* Header 섹션 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">Retail Analytics</h1>
                <p className="text-black/50 font-medium tracking-tight">Real-time risk prediction and sustainability metrics for your storefront.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 rounded-full border border-black/10 font-bold text-sm hover:bg-black/5 transition-colors">Export Report</button>
                <button className="px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:scale-[1.02] transition-transform">Add Custom Metric</button>
              </div>
            </div>

            {activeTab === "Inventory" ? (
              <InventoryView />
            ) : activeTab === "Review Insights" ? (
              <ReviewInsightsView />
            ) : (
              <>
                {/* Intelligence Summary Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-black text-white rounded-[32px] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden relative group">
                <div className="z-10 relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    AI Optimization Active
                  </div>
                  <h3 className="text-3xl font-black tracking-tight mb-2">Fit Intelligence Analysis</h3>
                  <p className="text-white/50 max-w-md text-sm leading-relaxed font-medium">
                    Our cross-model analysis shows that sizing accuracy has increased by {(stats.accuracyRate - 80).toFixed(1)}% since deployment. Return risks are live-monitored.
                  </p>
                </div>
                <div className="flex gap-6 sm:gap-10 z-10 relative">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Prevented Returns</p>
                    <p className="text-4xl font-black text-green-400">{Math.floor(stats.totalOrders * 0.42)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Accuracy Rate</p>
                    <p className="text-4xl font-black text-indigo-400">{stats.accuracyRate}%</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] -mr-32 -mt-32 group-hover:bg-indigo-500/30 transition-all duration-700" />
              </div>
              <div className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm flex flex-col justify-between">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">Optimization Goal</p>
                   <h4 className="text-xl font-bold tracking-tight">Zero Waste Returns</h4>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[78%]" />
                  </div>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-black/40">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                </div>
                <button className="mt-6 w-full py-3 bg-black/5 hover:bg-black/10 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-colors">
                   View Fit Insights
                </button>
              </div>
            </div>

            {/* Stats Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                label="Total Revenue" 
                value={`$${stats.totalRevenue.toLocaleString()}`} 
                sub="Cumulative sales volume" 
                icon={<ShoppingCart size={22} />}
                trend="up"
              />
              <StatCard 
                label="Carbon Saved" 
                value={`${stats.totalCarbonSaved.toFixed(1)}kg`} 
                sub="Environmental impact avoided" 
                icon={<Leaf size={22} />}
                trend="up"
              />
              <StatCard 
                label="Total Orders" 
                value={stats.totalOrders.toString()} 
                sub="Processed through FitAI" 
                icon={<Package size={22} />}
              />
              <StatCard 
                label="Avg Risk Rate" 
                value={`${stats.avgRisk}%`} 
                sub="Return probability average" 
                icon={<AlertTriangle size={22} />}
                trend={stats.avgRisk > 20 ? "up" : "down"}
              />
            </div>

            {/* Real-time Orders Table */}
            <div className="bg-white border border-black/5 rounded-[32px] overflow-hidden shadow-2xl shadow-black/[0.02]">
              <div className="p-8 border-b border-black/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black tracking-tight">Return Risk Analysis</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <div className="flex items-center gap-6 text-sm font-bold text-black/40">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> Low Risk</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> Moderate</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> High Priority</span>
                </div>
              </div>

              {isLoading ? (
                <div className="p-40 flex flex-col items-center justify-center gap-4">
                  <div className="w-10 h-10 border-4 border-black/5 border-t-black rounded-full animate-spin" />
                  <p className="text-sm font-bold text-black/20 uppercase tracking-widest">Fetching DB Assets...</p>
                </div>
              ) : error ? (
                <div className="p-40 flex flex-col items-center justify-center gap-4">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                  <p className="text-sm font-bold text-red-500 uppercase tracking-widest text-center max-w-xs">{error}</p>
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="p-40 text-center">
                  <p className="text-black/40 font-bold uppercase tracking-widest">No orders detected in the system.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/[0.02]">
                        <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">#</th>
                        <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">Customer</th>
                        <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">Product</th>
                        <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest">Amount</th>
                        <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest text-center">Risk Percent</th>
                        <th className="py-4 px-4 text-[11px] font-black text-black/30 uppercase tracking-widest text-center">CSR Impact</th>
                        <th className="py-4 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, idx) => (
                        <OrderRow key={order.id} order={order} index={idx} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
               <div className="p-8 bg-black/[0.01] border-t border-black/5 flex justify-center">
                <button className="text-sm font-black text-black hover:underline underline-offset-4">View All System Records</button>
              </div>
            </div>
              </>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
}
