"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { Minus, Plus, Trash2, ShoppingCart, Activity } from "lucide-react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { evaluateCartItemFit } from "@/lib/fitEngine";
import { useFitProfile } from "@/lib/useFitProfile";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const { measurements, mounted } = useFitProfile();

  // Real calculation for checkout
  const discountRate = 0.20; // 20%
  const discountAmount = subtotal * discountRate;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;
  
  // Aggregate Return Probability Matrix
  let aggregateRisk = 0;
  if (items.length > 0 && mounted) {
      let cumulative = 0;
      items.forEach(item => {
         const p = PRODUCTS[item.productId];
         if (p) {
             const r = evaluateCartItemFit(p, item.size, measurements);
             cumulative += r.returnProbability;
         }
      });
      aggregateRisk = Math.round(cumulative / items.length);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1140px] mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-black/50 mb-[18px]">
          <Link href="/">Home</Link> › <span className="text-black font-medium">Cart</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-black uppercase tracking-[1px] mb-6">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
          {/* Cart Items */}
          <div className="border border-black/10 rounded-[20px] p-5 flex flex-col">

            {items.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-2">
                  <ShoppingCart className="w-10 h-10 text-black/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-black">Your cart is empty</h2>
                  <p className="text-sm text-black/50">Looks like you haven't added anything to your cart yet.</p>
                </div>
                <Link href="/" className="bg-black text-white px-8 py-4 rounded-full text-sm font-bold hover:scale-105 transition-transform">
                  Go to Shop
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 items-start sm:items-center py-4 border-b border-black/10 last:border-b-0">
                  <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-xl bg-[#F0EEED] relative flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {/* Render Image safely by ensuring it starts with / or http */}
                    {item.image && (item.image.startsWith('/') || item.image.startsWith('http')) ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#F0EEED]">
                        <svg viewBox="0 0 40 40" className="w-10 h-10 text-black/20" fill="currentColor">
                          <path d="M20 18L30 12Q40 8 50 12L60 18L70 30L58 36L56 70H24L22 36L10 30Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full min-h-[90px] sm:min-h-[110px]">
                    <div className="flex flex-col gap-0.5 sm:gap-1.5 justify-start h-full pt-1">
                      <div className="text-base sm:text-lg font-bold line-clamp-1">{item.name}</div>
                      <div className="text-xs sm:text-sm text-black/50 leading-relaxed">
                        Size: {item.size}<br />
                        Color: <span className="w-3 h-3 inline-block rounded-full border border-black/20 translate-y-0.5 ml-1" style={{ backgroundColor: item.color }} />
                      </div>
                      <div className="text-lg sm:text-xl font-bold sm:mt-auto leading-none mt-2">${item.price}</div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-3 sm:mt-0 sm:h-[110px]">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-transparent border-none cursor-pointer p-0 hover:text-red-600 text-red-500 transition-colors hidden sm:block"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                      <div className="flex w-full justify-between items-center sm:w-auto">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-transparent border-none cursor-pointer p-0 hover:text-red-600 text-red-500 transition-colors sm:hidden"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex items-center gap-3 bg-[#f0f0f0] rounded-[30px] py-1.5 px-3 sm:py-2 sm:px-4 sm:mt-auto">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-transparent border-none cursor-pointer text-base sm:text-lg font-medium leading-none text-black hover:opacity-60"
                          >
                            <Minus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <span className="text-xs sm:text-sm font-medium min-w-[14px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-transparent border-none cursor-pointer text-base sm:text-lg font-medium leading-none text-black hover:opacity-60"
                          >
                            <Plus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

          {/* Order Summary */}
          <div className="border border-black/10 rounded-[20px] p-5 flex flex-col gap-4">
            <div className="text-xl font-bold">Order Summary</div>

            <div className="flex justify-between items-center">
              <span className="text-base text-black/60">Subtotal</span>
              <span className="text-base font-bold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-black/60">Discount (-20%)</span>
              <span className="text-base font-bold text-[#ff3333]">-${discountAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-black/60">Delivery Fee</span>
              <span className="text-base font-bold">${deliveryFee.toFixed(2)}</span>
            </div>

            <hr className="border-none border-t border-black/10" />

            <div className="flex justify-between items-center">
              <span className="text-base font-medium">Total</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>

            <div className="flex gap-2.5 mt-2">
              <div className="flex-1 flex items-center gap-2 bg-[#f0f0f0] rounded-[30px] px-4 py-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] opacity-40">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <input
                  placeholder="Add promo code"
                  type="text"
                  className="bg-transparent border-none outline-none text-sm text-black/40 w-full"
                />
              </div>
              <button className="bg-black text-white border-none rounded-[30px] px-5 py-2.5 text-sm font-medium cursor-pointer whitespace-nowrap">
                Apply
              </button>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className="bg-black text-white border-none rounded-[30px] py-4 text-sm font-medium cursor-pointer flex items-center justify-center gap-2.5 w-full mt-2 hover:bg-black/80 transition-colors">
              Go to Checkout
              <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] stroke-white stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="bg-black rounded-[20px] my-12 px-6 lg:px-12 py-9 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-[28px] font-black uppercase leading-tight max-w-[360px] text-center md:text-left">
            Stay upto date about our latest offers
          </div>
          <div className="flex flex-col gap-3 w-full md:min-w-[300px] max-w-[350px]">
            <div className="flex items-center gap-2.5 bg-white rounded-[30px] px-4 py-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" width="18" height="18">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                placeholder="Enter your email address"
                type="email"
                className="border-none outline-none text-sm text-black w-full bg-transparent placeholder-black/40"
              />
            </div>
            <button className="bg-white border-none rounded-[30px] py-3 text-sm font-medium cursor-pointer text-center w-full hover:bg-white/90">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}