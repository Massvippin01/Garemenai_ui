"use client";
import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const isValidSrc = (src: string) => src.startsWith("/") || src.startsWith("http");

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-[110px] shrink-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`w-[80px] lg:w-full shrink-0 aspect-square rounded-[20px] flex items-center justify-center overflow-hidden transition-all relative ${
              activeIdx === idx
                ? "border-2 border-black ring-1 ring-black/20"
                : "border border-black/10 hover:border-black/30"
            }`}
            style={{ background: "#F0EEED" }}
            aria-label={`View image ${idx + 1} of ${productName}`}
          >
            {isValidSrc(img) ? (
              <Image src={img} alt={`${productName} ${idx + 1}`} fill className="object-cover" />
            ) : (
              <div className="w-[80%] h-[80%] flex items-center justify-center">
                <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
                  <path
                    d="M80 80 L50 140 L80 148 L80 280 L220 280 L220 148 L250 140 L220 80 L190 60 Q170 80 150 80 Q130 80 110 60 Z"
                    fill="#3d3a2e"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        className="flex-1 rounded-[20px] flex items-center justify-center overflow-hidden min-h-[400px] relative"
        style={{ background: "#F0EEED" }}
      >
        {isValidSrc(images[activeIdx]) ? (
          <Image
            src={images[activeIdx]}
            alt={productName}
            fill
            className="object-contain p-6"
            priority
          />
        ) : (
          <div className="w-[70%] h-[70%] flex items-center justify-center">
            <svg viewBox="0 0 300 320" fill="none" className="w-full h-full">
              <path
                d="M80 80 L50 140 L80 148 L80 280 L220 280 L220 148 L250 140 L220 80 L190 60 Q170 80 150 80 Q130 80 110 60 Z"
                fill="#3d3a2e"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
