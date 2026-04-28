"use client";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import StarRating from "@/components/StarRating";
import { Product } from "@/types";
import { useCart } from "@/lib/CartContext";
import { useFitProfile } from "@/lib/useFitProfile";
import { recommendBestSize } from "@/lib/fitEngine";

interface ProductInfoProps {
  product: Product;
}

const SIZE_LABELS: Record<string, string> = {
  Small: "Small",
  Medium: "Medium",
  Large: "Large",
  "X Large": "X Large",
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes.includes("Large") ? "Large" : product.sizes[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  const { measurements, mounted } = useFitProfile();
  const fitAnalysis = mounted ? recommendBestSize(product, measurements) : null;
  
  // Cold Start Gate: Only show prediction after enough "transitions" or image training
  const canShowRecommendation = measurements.hasUsedAi || measurements.interactionCount > 1;
  const isOptimal = canShowRecommendation && fitAnalysis && fitAnalysis.recommendedSize;

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}-${product.colors[selectedColor]}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: SIZE_LABELS[selectedSize] || selectedSize,
      color: product.colors[selectedColor],
      quantity: qty,
    });
    setQty(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <h1
        className="text-[clamp(28px,3vw,40px)] font-extrabold text-black uppercase leading-tight"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {product.name}
      </h1>

      {/* Rating row */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} size={20} />
        <span className="text-sm text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {product.rating}/5
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span
          className="text-[32px] font-bold text-black leading-none"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ${product.price}
        </span>
        {product.originalPrice && (
          <span
            className="text-[32px] font-bold text-black/30 line-through leading-none"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            ${product.originalPrice}
          </span>
        )}
        {product.discount && (
          <span className="bg-[#FF3333]/10 text-[#FF3333] text-sm font-medium px-3 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className="text-sm text-black/60 leading-relaxed border-b border-black/10 pb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {product.description}
      </p>

      {/* Color selector */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Select Color
        </span>
        <div className="flex gap-3">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(idx)}
              className={`w-9 h-9 rounded-full transition-all ${
                selectedColor === idx
                  ? "ring-2 ring-black ring-offset-2"
                  : "hover:ring-2 hover:ring-black/30 hover:ring-offset-1"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Color option ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div className="flex flex-col gap-3 border-b border-black/10 pb-5">
        <span className="text-sm font-medium text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Choose Size
        </span>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => {
            const isRecommended = fitAnalysis?.recommendedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : isRecommended
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "bg-[#F0F0F0] text-black hover:bg-black/10"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {SIZE_LABELS[size] || size}
                {isRecommended && (
                  <span className="absolute -top-2 -right-1 bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-md">
                    Best Fit
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* AI Recommendation Badge */}
        {isOptimal && (
          <div className="mt-3 p-5 bg-green-50 border border-green-100 rounded-[20px] transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-black text-green-900 uppercase tracking-tight">Matched to Profile</span>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100/50 px-2.5 py-1 rounded-full">
                {fitAnalysis.confidenceScore}% Confidence
              </span>
            </div>
            <div className="flex flex-col gap-2">
               <p className="text-xs font-bold text-green-800 leading-relaxed">
                 Our AI analyzed your {measurements.hasUsedAi ? "33-point body scan" : "fit history"} and recommends <span className="underline decoration-2 underline-offset-4">{fitAnalysis.recommendedSize}</span> as your mathematical optimum.
               </p>
               <div className="flex flex-wrap gap-2 mt-1">
                  {fitAnalysis.reasons.map((reason, i) => (
                    <span key={i} className="text-[10px] font-bold bg-white/60 border border-green-200 text-green-700 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                       <ShieldCheck size={10} /> {reason}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* Measurement Specs Card */}
        {product.sizeMeasurements?.[selectedSize] && (
          <div className="mt-4 bg-[#F9F9F9] rounded-[20px] p-4 border border-black/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-black/40">Size Specs ({selectedSize})</span>
              <span className="text-[10px] font-bold text-black/30">Units: cm</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-black/40 uppercase">Chest</span>
                <span className="text-sm font-black text-black">{product.sizeMeasurements[selectedSize].chest}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-black/40 uppercase">Waist</span>
                <span className="text-sm font-black text-black">{product.sizeMeasurements[selectedSize].waist}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-black/40 uppercase">Length</span>
                <span className="text-sm font-black text-black">{product.sizeMeasurements[selectedSize].length}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-black/40 uppercase">Shoulder</span>
                <span className="text-sm font-black text-black">{product.sizeMeasurements[selectedSize].shoulder || "--"}</span>
              </div>
              {product.sizeMeasurements[selectedSize].rise && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-black/40 uppercase">Rise</span>
                  <span className="text-sm font-black text-black">{product.sizeMeasurements[selectedSize].rise}</span>
                </div>
              )}
              {product.sizeMeasurements[selectedSize].legOpening && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-black/40 uppercase">Leg Opening</span>
                  <span className="text-sm font-black text-black">{product.sizeMeasurements[selectedSize].legOpening}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Qty + Add to cart */}
      <div className="flex items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center gap-4 bg-[#F0F0F0] rounded-full px-5 py-3">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="hover:opacity-60 transition-opacity"
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>
          <span
            className="text-base font-medium w-6 text-center"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="hover:opacity-60 transition-opacity"
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-3 bg-black text-white rounded-full py-3 text-base font-medium hover:bg-black/80 transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <ShoppingCart size={18} />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
