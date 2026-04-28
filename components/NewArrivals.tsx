import ProductCard from "./ProductCard";
import Link from "next/link";

const newArrivals = [
  { name: "HEAVYWEIGHT BOMBER JACKET", price: 85, originalPrice: 110, discount: 22, rating: 4.9, ratingCount: "4.9", imageUrl: "/images/jacket_bomber.png", productId: "heavyweight-bomber-jacket" },
  { name: "CHECKERED SHIRT", price: 45, rating: 4.5, ratingCount: "4.5", imageUrl: "/images/first 2.png", productId: "checkered-shirt" },
  { name: "T-SHIRT WITH TAPE DETAILS", price: 32, rating: 4.5, ratingCount: "4.5", imageUrl: "/images/first 3.png", productId: "tshirt-tape-details" },
  { name: "INDUSTRIAL BAGGIE JEANS", price: 65, rating: 4.8, ratingCount: "4.8", imageUrl: "/images/style_casual.png", productId: "industrial-baggy-jeans" },
];

export default function NewArrivals() {
  return (
    <section className="py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <h2
          className="text-center text-[clamp(32px,4vw,48px)] font-bold text-black mb-10 uppercase tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          NEW ARRIVALS
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
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

      {/* Divider */}
      <div className="max-w-[1240px] mx-auto px-6 mt-16">
        <hr className="border-black/10" />
      </div>
    </section>
  );
}
