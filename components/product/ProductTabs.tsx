"use client";
import { useState, useEffect } from "react";
import { MoreHorizontal, SlidersHorizontal, PenSquare, X, Star } from "lucide-react";
import StarRating from "@/components/StarRating";
import { Review } from "@/types";
import { addReview } from "@/app/actions/reviews";

interface ProductTabsProps {
  productId: string;
  reviews: Review[];
  reviewCount: number;
}

function VerifiedBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="#01AB31" />
      <path
        d="M5.5 9L7.8 11.5L12.5 6.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-3 border border-black/10 rounded-[20px] p-6 relative overflow-hidden group">
      <div className="flex items-start justify-between mt-2">
        <div className="flex flex-col gap-1">
          <StarRating rating={review.rating} size={16} />
          <div className="flex items-center gap-2 mt-1">
            <span
              className="font-bold text-base text-black"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {review.author}
            </span>
            {review.verified && <VerifiedBadge />}
          </div>
        </div>
      </div>
      <p
        className="text-sm text-black/60 leading-[22px] pr-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-2 border-t border-black/5 pt-3">
        <p className="text-xs text-black/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Posted on {review.date}
        </p>
      </div>
    </div>
  );
}

const TABS = ["Product Details", "Rating & Reviews", "FAQs"];

export default function ProductTabs({ productId, reviews: initialReviews, reviewCount }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("Rating & Reviews");
  const [showAll, setShowAll] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load purely local reviews for demo guaranteed success
  useEffect(() => {
    const saved = localStorage.getItem("shop-co-reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews([...parsed, ...initialReviews]);
      } catch (e) {}
    }
  }, [initialReviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setIsSubmitting(true);
    
    const newReview: Review = {
      id: Date.now().toString(),
      productId: productId,
      author,
      rating,
      text,
      verified: true,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    // Save optimistically to local cache
    const existing = JSON.parse(localStorage.getItem("shop-co-reviews") || "[]");
    localStorage.setItem("shop-co-reviews", JSON.stringify([newReview, ...existing]));
    
    setReviews([newReview, ...reviews]);
    
    // Send to Neon DB action silently
    await addReview({
      productId: productId,
      author: newReview.author,
      rating: newReview.rating,
      text: newReview.text,
      date: newReview.date
    });

    setIsSubmitting(false);
    setIsModalOpen(false);
    setAuthor("");
    setText("");
    setRating(5);
  };

  const displayed = showAll ? reviews : reviews.slice(0, 6);

  return (
    <div className="mt-12">
      {/* Tab headers */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide border-b border-black/10 max-w-[1240px] mx-auto px-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-base transition-all relative ${
              activeTab === tab
                ? "text-black font-medium"
                : "text-black/40 hover:text-black/70"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-w-[1240px] mx-auto px-6 pt-8">
        {activeTab === "Rating & Reviews" && (
          <div className="flex flex-col gap-6">
            {/* Header row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h3
                className="text-xl font-bold text-black"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                All Reviews{" "}
                <span className="text-black/40 font-normal text-base">
                  ({reviewCount})
                </span>
              </h3>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button className="p-2 rounded-full bg-[#F0F0F0] hover:bg-black/10 transition-colors">
                  <SlidersHorizontal size={18} />
                </button>
                <select
                  className="text-sm border border-black/10 rounded-full px-4 py-2 outline-none bg-white"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option>Latest</option>
                  <option>Oldest</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-black text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-black/80 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <PenSquare size={15} />
                  Write a Review
                </button>
              </div>
            </div>

            {/* Reviews grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayed.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Load more */}
            {!showAll && reviews.length > 6 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="border border-black/10 rounded-full px-10 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "Product Details" && (
          <div className="flex flex-col gap-4 max-w-2xl">
            <h3 className="text-xl font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Product Details
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <li><strong className="text-black">Material:</strong> 100% Cotton</li>
              <li><strong className="text-black">Fit:</strong> Regular Fit</li>
              <li><strong className="text-black">Neck:</strong> Round Neck</li>
              <li><strong className="text-black">Sleeve:</strong> Short Sleeve</li>
              <li><strong className="text-black">Care:</strong> Machine wash, tumble dry low</li>
            </ul>
          </div>
        )}

        {activeTab === "FAQs" && (
          <div className="flex flex-col gap-4 max-w-2xl">
            {[
              { q: "What sizes are available?", a: "We offer Small, Medium, Large, and X Large." },
              { q: "How do I care for this shirt?", a: "Machine wash cold, tumble dry low. Do not bleach." },
              { q: "What is the return policy?", a: "We accept returns within 30 days of purchase for unworn items." },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-black/10 pb-4">
                <p className="font-semibold text-sm text-black mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q}</p>
                <p className="text-sm text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[24px] w-full max-w-lg p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[24px] font-extrabold text-black uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Write a Review</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-black/40 hover:text-black">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitReview} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-black mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        size={28}
                        fill={star <= rating ? "#FFC633" : "transparent"}
                        stroke={star <= rating ? "#FFC633" : "#00000030"}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Your Name</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-black/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black/30 bg-[#F0F0F0]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Review contents</label>
                <textarea
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="I absolutely love this t-shirt! The design is unique..."
                  rows={4}
                  className="w-full border border-black/10 rounded-[20px] px-5 py-4 text-sm focus:outline-none focus:border-black/30 bg-[#F0F0F0] resize-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white rounded-full py-4 font-medium text-base mt-2 hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
