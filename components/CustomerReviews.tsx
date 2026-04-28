"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    verified: true,
    text: "I'm blown away by the quality and style of the clothes I received from Celestials.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    verified: true,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Celestials.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    rating: 5,
    verified: true,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Celestials.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="20" height="20" viewBox="0 0 20 20" fill={s <= rating ? "#FFC633" : "#E0E0E0"}>
          <path d="M10 1L12.39 7L19 7.64L14.18 12.04L15.56 18.5L10 15.27L4.44 18.5L5.82 12.04L1 7.64L7.61 7L10 1Z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ name, rating, verified, text }: typeof reviews[0]) {
  return (
    <div className="border border-black/10 rounded-[20px] p-6 sm:p-8 flex flex-col gap-4 min-w-[280px] sm:min-w-[380px] max-w-[400px] shrink-0 snap-center">
      <StarRating rating={rating} />
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {name}
        </span>
        {verified && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#01AB31" />
            <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <p className="text-base text-black/60 leading-[22px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

export default function CustomerReviews() {
  const [scrollIndex, setScrollIndex] = useState(0);

  return (
    <section className="py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-[clamp(28px,4vw,48px)] font-bold text-black uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setScrollIndex(Math.min(reviews.length - 1, scrollIndex + 1))}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6 pb-4">
          <div className="flex gap-4 sm:gap-6 w-max">
            {reviews.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
