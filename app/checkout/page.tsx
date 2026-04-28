"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, ShieldCheck, Truck, MapPin, PackageCheck, Loader2, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createOrder } from "@/lib/actions/order.actions";
import { useFitProfile } from "@/lib/useFitProfile";
import { PRODUCTS } from "@/lib/data";

export default function CheckoutPage() {
  const router = useRouter();
  const { subtotal, items, clearCart } = useCart();
  const { measurements, saveMeasurements } = useFitProfile();
  const [phase, setPhase] = useState<"REVIEW" | "PAYMENT" | "LOGISTICS" | "CONFIRMED">("REVIEW");
  const [progressMsg, setProgressMsg] = useState("");
  const [confirmedHash, setConfirmedHash] = useState("");
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Carter");

  const discountRate = 0.20;
  const discountAmount = subtotal * discountRate;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  // Track the actual order value for the final rendering before clearing cart
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    if (phase === "REVIEW") {
      setFinalTotal(total);
    }
  }, [total, phase]);

  const startCheckout = () => {
    if (items.length === 0) return;

    setPhase("PAYMENT");
    setProgressMsg("Verifying payment token securely...");

    setTimeout(() => {
      setProgressMsg("Payment Approved. Forwarding to Fulfilment...");

      setTimeout(() => {
        setPhase("LOGISTICS");
        setProgressMsg("Locating nearest warehouse...");

        setTimeout(() => {
          setProgressMsg("Generating AI optimal carrier route...");

          setTimeout(() => {
            setProgressMsg("Locking dispatch schedule...");

            setTimeout(() => {
              const orderHash = `CLS-X94-${Math.floor(Math.random() * 8999 + 1000)}`;
              setConfirmedHash(orderHash);

              // 1. Kick off database write in background (don't await it to block UI)
              createOrder({
                orderHash,
                customerName: `${firstName} ${lastName}`,
                totalAmount: total,
                items: items.map(item => ({
                  productId: item.productId || item.id,
                  name: item.name,
                  price: item.price,
                  size: item.size || "M",
                  color: item.color || "#000",
                  quantity: item.quantity
                }))
              }).catch(err => console.error("Background Order Sync Failed:", err));

              // 2. Autonomous Behavioral Size Learning Model
              let learnedMeasurements = { ...measurements };
              let updated = false;
              items.forEach(item => {
                  const product = PRODUCTS[item.productId || item.id];
                  if (product && product.sizeMeasurements && product.sizeMeasurements[item.size]) {
                      const spec = product.sizeMeasurements[item.size];
                      if (spec.chest && !learnedMeasurements.chest) { learnedMeasurements.chest = spec.chest.toString(); updated = true; }
                      if (spec.waist && !learnedMeasurements.waist) { learnedMeasurements.waist = spec.waist.toString(); updated = true; }
                      if (spec.hips && !learnedMeasurements.hips) { learnedMeasurements.hips = spec.hips.toString(); updated = true; }
                      if (spec.inseam && !learnedMeasurements.inseam) { learnedMeasurements.inseam = spec.inseam.toString(); updated = true; }
                  }
              });
              if (updated) {
                  saveMeasurements(learnedMeasurements);
              }

              // 3. Move to success UI immediately after the "dispatch lock" simulation
              setTimeout(() => {
                setPhase("CONFIRMED");
                clearCart();
              }, 1500);
            }, 2000);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 2000);
  };

  if (items.length === 0 && phase === "REVIEW") {
    return (
      <main className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-6">
            <PackageCheck className="w-10 h-10 text-black/40" />
          </div>
          <h1 className="text-3xl font-black mb-3 text-black tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>No items to checkout</h1>
          <p className="text-black/60 mb-8 max-w-sm">Your cart is completely empty. Add some fresh fits before proceeding to checkout!</p>
          <Link href="/" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Return to Shop
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans transition-colors duration-1000">
      <Navbar />

      <div className="flex-1 max-w-[1140px] w-full mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-sm text-black/50 mb-[24px] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <span className={phase === "REVIEW" ? "text-black" : ""}>Review</span>
          <ChevronRight className="w-4 h-4" />
          <span className={phase === "PAYMENT" || phase === "LOGISTICS" ? "text-black" : ""}>Processing</span>
          <ChevronRight className="w-4 h-4" />
          <span className={phase === "CONFIRMED" ? "text-black" : ""}>Confirmation</span>
        </div>

        {phase === "REVIEW" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Left: Express Checkout & Form */}
            <div className="flex flex-col gap-6">
              <div className="bg-white p-8 rounded-[24px] border border-black/10 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <MapPin className="w-5 h-5 text-indigo-500" /> Shipping Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-black/50 uppercase tracking-widest pl-1">First Name</label>
                    <input type="text" className="w-full mt-1 bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-black/50 uppercase tracking-widest pl-1">Last Name</label>
                    <input type="text" className="w-full mt-1 bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-black/50 uppercase tracking-widest pl-1">Address</label>
                    <input type="text" className="w-full mt-1 bg-[#F9F9F9] border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/30" defaultValue="10X Celestials Lane, Suite 402" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[24px] border border-black/10 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <CreditCard className="w-5 h-5 text-indigo-500" /> Payment Method
                </h2>
                <div className="border-2 border-indigo-500 bg-indigo-50/50 rounded-xl p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-white rounded shadow-sm border border-black/5 flex items-center justify-center font-black italic text-indigo-700 text-[10px]">VISA</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                      <p className="text-[11px] text-gray-500">Expires 12/28</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-4 border-indigo-500 bg-white" />
                </div>
                <div className="flex items-center gap-2 mt-5 text-xs text-black/50">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> SECURE 256-BIT SSL ENCRYPTION
                </div>
              </div>
            </div>

            {/* Right: Payment Summary */}
            <div className="bg-black text-white rounded-[24px] p-8 flex flex-col h-fit sticky top-10 shadow-2xl shadow-black/20">
              <h3 className="text-xl font-bold mb-6 tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Order Summary</h3>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center text-white/70">
                  <span className="text-sm">Items ({items.length})</span>
                  <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span className="text-sm">Discount</span>
                  <span className="font-semibold text-green-400">-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span className="text-sm">Expedited Shipping</span>
                  <span className="font-semibold text-white">${deliveryFee.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-white/20 pt-6 mb-8 flex justify-between items-end">
                <span className="text-base font-medium">Total Price</span>
                <span className="text-3xl font-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={startCheckout}
                className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Pay Now <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {(phase === "PAYMENT" || phase === "LOGISTICS") && (
          <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[3px] border-black/5" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 border-l-indigo-500 animate-spin" style={{ animationDuration: '1.5s' }} />
              {phase === "PAYMENT" ? (
                <CreditCard className="w-10 h-10 text-black/60 animate-pulse" />
              ) : (
                <Truck className="w-12 h-12 text-black/60 animate-bounce" />
              )}
            </div>

            <h2 className="text-3xl font-black text-black tracking-tight mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {phase === "PAYMENT" ? "Processing Transaction" : "Intelligent Routing Active"}
            </h2>
            <p className="text-black/50 text-center uppercase tracking-widest text-sm font-bold min-w-[300px]">
              {progressMsg}
            </p>
          </div>
        )}

        {phase === "CONFIRMED" && (
          <div className="flex flex-col items-center max-w-2xl mx-auto py-10">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-500/30">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>Order Confirmed!</h1>
            <p className="text-black/60 text-center mb-10 text-lg">Thank you for your purchase. We've received your order and our logistics AI has instantly routed your packages for dispatch.</p>

            <div className="w-full bg-white border border-black/10 rounded-[24px] p-8 shadow-sm mb-8">
              <div className="flex items-center justify-between border-b border-black/5 pb-6 mb-6">
                <div>
                  <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Order Hash</p>
                  <p className="font-mono font-bold text-lg text-black">{confirmedHash}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Amount Paid</p>
                  <p className="font-bold text-xl text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>${finalTotal.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm mb-1">Estimated Delivery</h4>
                    <p className="text-xs text-black/60 leading-relaxed">Arriving in 2-3 business days fully tracked via AI Logistics Network.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm mb-1">Perfect Fit Guarantee</h4>
                    <p className="text-xs text-black/60 leading-relaxed">Generated using your precise AI fit references securely.</p>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/" className="bg-[#1B1B1D] text-white px-10 py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-black/10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Continue Shopping
            </Link>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}
