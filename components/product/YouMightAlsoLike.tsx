import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import { Product } from "@/types";

interface SimilarProductCardProps {
  product: Product;
}

function SimilarProductCard({ product }: SimilarProductCardProps) {
  const imgSrc = product.images[0];
  const isValidSrc = imgSrc && (imgSrc.startsWith("/") || imgSrc.startsWith("http"));

  return (
    <Link href={`/product/${product.id}`} className="flex flex-col gap-3 group cursor-pointer">
      <div className="w-full h-[298px] rounded-[20px] overflow-hidden relative bg-[#F0EEED]">
        {isValidSrc ? (
          <Image src={imgSrc} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 200 220" fill="none" className="w-[70%] h-[70%]">
              <path
                d="M55 55 L35 100 L55 107 L55 185 L145 185 L145 107 L165 100 L145 55 L125 38 Q105 58 100 58 Q95 58 75 38 Z"
                fill="#555"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      <div className="flex flex-col gap-1">
        <h3
          className="font-bold text-[18px] text-black uppercase tracking-wide leading-snug group-hover:underline"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} size={15} />
          <span className="text-xs text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {product.rating}/5
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-xl font-bold text-black"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            ${product.price}
          </span>
          {product.originalPrice && (
            <span
              className="text-xl font-bold text-black/30 line-through"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              ${product.originalPrice}
            </span>
          )}
          {product.discount && (
            <span className="text-xs font-medium text-[#FF3333] bg-[#FF3333]/10 rounded-full px-2 py-0.5">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

interface YouMightAlsoLikeProps {
  products: Product[];
}

export default function YouMightAlsoLike({ products }: YouMightAlsoLikeProps) {
  return (
    <section className="py-16 border-t border-black/10">
      <div className="max-w-[1240px] mx-auto px-6">
        <h2
          className="text-center text-[clamp(28px,3vw,40px)] font-extrabold text-black uppercase mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <SimilarProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
