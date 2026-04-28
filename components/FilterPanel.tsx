"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, SlidersHorizontal, Check } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const SIZES = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
const COLORS = [
  "#00C12B", "#F50606", "#F5DD06", "#F57906", "#06CAF5",
  "#063AF5", "#7D06F5", "#F506A4", "#FFFFFF", "#000000",
];

export interface FilterState {
  maxPrice: number;
  colors: string[];
  sizes: string[];
}

interface FilterPanelProps {
  onApplyFilters?: (filters: FilterState) => void;
}

export default function FilterPanel({ onApplyFilters }: FilterPanelProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(200);

  const toggleColor = (c: string) =>
    setSelectedColors((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const toggleSize = (s: string) =>
    setSelectedSizes((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        maxPrice,
        colors: selectedColors,
        sizes: selectedSizes,
      });
    }
  };

  const divider = <div className="w-full h-px bg-black/10" />;

  const SectionHeader = ({ label, expanded = true }: { label: string; expanded?: boolean }) => (
    <div className="flex justify-between items-center w-full">
      <span className="font-bold text-[20px] leading-[27px] text-black">
        {label}
      </span>
      {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </div>
  );

  return (
    <aside className="w-[295px] shrink-0 border border-black/10 rounded-[20px] p-6 flex flex-col gap-6 self-start sticky top-[100px] bg-white">
      {/* Filters header */}
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-[20px] leading-[27px] text-black">Filters</span>
        <SlidersHorizontal className="text-black/40" size={24} />
      </div>

      {divider}

      {/* Categories */}
      <div className="flex flex-col gap-5 w-full">
        {CATEGORIES.map((cat) => (
          <div key={cat} className="flex justify-between items-center cursor-pointer group">
            <span className="font-normal text-[16px] leading-[22px] text-black/60 group-hover:text-black transition-colors">
              {cat}
            </span>
            <ChevronRight className="text-black/60 group-hover:text-black transition-colors" size={16} />
          </div>
        ))}
      </div>

      {divider}

      {/* Price */}
      <div className="flex flex-col gap-5 w-full">
        <SectionHeader label="Price" />
        <div className="px-2 mt-2">
          <Slider
            min={0}
            max={250}
            value={maxPrice}
            onChange={(val) => setMaxPrice(val as number)}
            trackStyle={{ backgroundColor: "#000", height: 6 }}
            handleStyle={{
              borderColor: "#000",
              height: 20,
              width: 20,
              marginTop: -7,
              backgroundColor: "#000",
              opacity: 1,
              boxShadow: "none",
            }}
            railStyle={{ backgroundColor: "#F0F0F0", height: 6 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-medium text-[14px] leading-[19px] text-black">$0</span>
          <span className="font-medium text-[14px] leading-[19px] text-black">${maxPrice}</span>
        </div>
      </div>

      {divider}

      {/* Colors */}
      <div className="flex flex-col gap-5 w-full">
        <SectionHeader label="Colors" />
        <div className="flex flex-wrap gap-4">
          {COLORS.map((color) => {
            const active = selectedColors.includes(color);
            const isLight = color === "#FFFFFF" || color === "#F5DD06";
            return (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={`w-[37px] h-[37px] rounded-full flex items-center justify-center border transition-all ${
                  active ? "border-black/20 ring-2 ring-black/45 ring-offset-2" : "border-black/20 hover:scale-110"
                }`}
                style={{ backgroundColor: color }}
              >
                {active && (
                  <Check size={16} className={isLight ? "text-black" : "text-white"} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {divider}

      {/* Size */}
      <div className="flex flex-col gap-5 w-full">
        <SectionHeader label="Size" />
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`flex justify-center items-center px-5 h-[39px] rounded-full border-none cursor-pointer text-[14px] leading-[19px] transition-colors ${
                  active
                    ? "bg-black text-white font-medium"
                    : "bg-[#F0F0F0] text-black/60 font-normal hover:bg-black/10 hover:text-black"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {divider}

      {/* Apply Filter */}
      <button 
        onClick={handleApply}
        className="flex justify-center items-center w-full h-[48px] bg-black rounded-full font-medium text-[14px] leading-[19px] text-white hover:bg-black/80 transition-colors mt-2"
      >
        Apply Filter
      </button>
    </aside>
  );
}
