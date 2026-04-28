import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  ratingCount: string;
  productId?: string;
  imageUrl?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star - 0.5 <= rating;
        return (
          <svg key={star} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <defs>
              <linearGradient id={`half-home-${star}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#FFC633" />
                <stop offset="50%" stopColor="#E0E0E0" />
              </linearGradient>
            </defs>
            <path
              d="M8 1L9.85 5.6L15 6.27L11.25 9.87L12.29 15L8 12.56L3.71 15L4.75 9.87L1 6.27L6.15 5.6L8 1Z"
              fill={filled ? "#FFC633" : half ? `url(#half-home-${star})` : "#E0E0E0"}
            />
          </svg>
        );
      })}
    </div>
  );
}

function ClothingPlaceholder({ name }: { name: string }) {
  const lowerName = name.toLowerCase();
  const isJeans = lowerName.includes("jean") || lowerName.includes("shorts");
  const bodyColor = isJeans ? "#3B5998" : lowerName.includes("shirt") ? "#6B5E3C" : "#2c2c2c";

  return (
    <svg viewBox="0 0 200 220" fill="none" className="w-[75%] h-[75%]">
      {isJeans ? (
        <>
          <rect x="55" y="40" width="90" height="50" rx="4" fill={bodyColor} />
          <rect x="55" y="88" width="40" height="100" rx="4" fill={bodyColor} />
          <rect x="105" y="88" width="40" height="100" rx="4" fill={bodyColor} />
        </>
      ) : (
        <>
          <path d="M55 55 L35 100 L55 107 L55 185 L145 185 L145 107 L165 100 L145 55 L125 38 Q105 58 100 58 Q95 58 75 38 Z" fill={bodyColor} />
          <path d="M75 38 Q100 65 125 38" stroke="#00000022" strokeWidth="2" fill="none" />
        </>
      )}
    </svg>
  );
}

export default function ProductCard({
  name, price, originalPrice, discount, rating, ratingCount,
  productId = "one-life-graphic-tshirt", imageUrl
}: ProductCardProps) {
  return (
    <Link href={`/product/${productId}`} className="flex flex-col gap-3 cursor-pointer group">
      <div className="w-full h-[200px] sm:h-[250px] lg:h-[298px] rounded-[20px] flex items-center justify-center overflow-hidden relative bg-[#F0EEED]">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <ClothingPlaceholder name={name} />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-[20px]" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-sm sm:text-[18px] text-black leading-snug uppercase tracking-wide group-hover:underline line-clamp-1 sm:line-clamp-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="text-sm text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>{ratingCount}/5</span>
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-1">
          <span className="text-lg sm:text-[22px] font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>${price}</span>
          {originalPrice && <span className="text-base sm:text-[22px] font-bold text-black/40 line-through" style={{ fontFamily: "'DM Sans', sans-serif" }}>${originalPrice}</span>}
          {discount && <span className="text-[10px] sm:text-xs font-medium text-[#FF3333] bg-[#FF3333]/10 rounded-full px-2 sm:px-3 py-1">-{discount}%</span>}
        </div>
      </div>
    </Link>
  );
}
