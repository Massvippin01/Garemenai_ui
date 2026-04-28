import ProductCard from "./ProductCard";
import Link from "next/link";

const topSelling = [
  { name: "VERTICAL STRIPED SHIRT", price: 40, originalPrice: 50, discount: 20, rating: 5.0, ratingCount: "5.0", imageUrl: "/images/second 1.png", productId: "vertical-striped-shirt" },
  { name: "COURAGE GRAPHIC T-SHIRT", price: 28, rating: 4.0, ratingCount: "4.0", imageUrl: "/images/second 2.png", productId: "courage-graphic-tshirt" },
  { name: "LOOSE FIT BERMUDA SHORTS", price: 35, rating: 3.0, ratingCount: "3.0", imageUrl: "/images/second 3.png", productId: "loose-fit-bermuda-shorts" },
  { name: "FADED SKINNY JEANS", price: 55, rating: 4.5, ratingCount: "4.5", imageUrl: "/images/second 4.png", productId: "faded-skinny-jeans" },
];

export default function TopSelling() {
  return (
    <section className="py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <h2
          className="text-center text-[clamp(32px,4vw,48px)] font-bold text-black mb-10 uppercase tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          TOP SELLING
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {topSelling.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/category"
            className="border border-black/10 rounded-full px-14 py-4 text-base font-medium text-black hover:bg-black hover:text-white transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
