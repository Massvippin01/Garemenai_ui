"use client";

import { useState, useMemo } from "react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import FilterPanel, { FilterState } from "@/components/FilterPanel";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

// ─── Products ────────────────────────────────────
// Mocking colors and sizes here so the filter can actually demonstrate working logic
const PRODUCTS = [
  { id: "gradient-graphic-tshirt",  name: "Gradient Graphic T-shirt",  price: 30,             rating: 3.5, reviewCount: 321, imageUrl: "/images/second 2.png", colors: ["#000000", "#FFFFFF"], sizes: ["Small", "Large"] },
  { id: "polo-tipping-details",  name: "Polo with Tipping Details", price: 42,             rating: 4.5, reviewCount: 451, imageUrl: "/images/first 2.png", colors: ["#F50606"], sizes: ["Medium", "Large"] },
  { id: "black-striped-tshirt",  name: "Black Striped T-shirt",     price: 25, originalPrice: 35, discount: 30, rating: 5.0, reviewCount: 342, imageUrl: "/images/first 4.png", colors: ["#000000", "#F50606"], sizes: ["Small", "Medium", "Large"] },
  { id: "skinny-fit-jeans",  name: "Skinny Fit Jeans",          price: 52, originalPrice: 65, discount: 20, rating: 3.5, reviewCount: 321, imageUrl: "/images/first 4.png", colors: ["#063AF5"], sizes: ["Large", "X-Large"] },
  { id: "checkered-shirt",  name: "Checkered Shirt",           price: 45,             rating: 4.5, reviewCount: 451, imageUrl: "/images/first 2.png", colors: ["#00C12B"], sizes: ["Small"] },
  { id: "sleeve-striped-tshirt",  name: "Sleeve Striped T-shirt",    price: 25, originalPrice: 35, discount: 30, rating: 4.5, reviewCount: 451, imageUrl: "/images/first 1.png", colors: ["#F5DD06"], sizes: ["Medium"] },
  { id: "vertical-striped-shirt",  name: "Vertical Striped Shirt",    price: 40, originalPrice: 50, discount: 20, rating: 5.0, reviewCount: 321, imageUrl: "/images/second 1.png", colors: ["#000000", "#FFFFFF"], sizes: ["Small", "Medium"] },
  { id: "courage-graphic-tshirt",  name: "Courage Graphic T-shirt",   price: 28,             rating: 4.0, reviewCount: 451, imageUrl: "/images/second 2.png", colors: ["#06CAF5"], sizes: ["Large"] },
  { id: "loose-fit-bermuda-shorts",  name: "Loose Fit Bermuda Shorts",  price: 35,              rating: 3.0, reviewCount: 451, imageUrl: "/images/second 3.png", colors: ["#063AF5"], sizes: ["Small", "Medium", "Large"] },
];

export default function CategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const displayedProducts = useMemo(() => {
    if (!activeFilters) return PRODUCTS;

    return PRODUCTS.filter((product) => {
      // Price Filter
      if (product.price > activeFilters.maxPrice) return false;

      // Colors filter (if any are selected, product must have at least one)
      if (activeFilters.colors.length > 0) {
        const hasMatchingColor = product.colors.some((c) => activeFilters.colors.includes(c));
        if (!hasMatchingColor) return false;
      }

      // Sizes filter (if any are selected, product must have at least one)
      if (activeFilters.sizes.length > 0) {
        const hasMatchingSize = product.sizes.some((s) => activeFilters.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      return true;
    });
  }, [activeFilters]);

  // Adjust pagination artificially based on filtered results
  const itemsPerPage = 6;
  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = displayedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white min-h-screen">
      <TopBanner />
      <Navbar />

      <div className="w-full h-px bg-black/10 mt-6 hidden md:block max-w-[1240px] mx-auto" />

      <div className="max-w-[1240px] mx-auto">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Casual" }]} />
      </div>

      <main className="max-w-[1240px] mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row gap-5 items-start mt-2">
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <FilterPanel onApplyFilters={setActiveFilters} />
          </div>

          {/* Mobile Filter & Header */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-[24px] md:text-[32px] leading-[43px] text-black">Casual</h1>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-black/60 text-[16px]">
                  Showing {paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, displayedProducts.length)} of {displayedProducts.length} Products
                </span>
                <div className="hidden sm:flex items-center gap-1 cursor-pointer">
                  <span className="text-black/60 text-[16px]">Sort by: </span>
                  <span className="text-black font-medium text-[16px]">Most Popular</span>
                  <ChevronDown size={16} />
                </div>
                {/* Mobile Filter button */}
                <button className="md:hidden flex items-center justify-center p-2 bg-[#F0F0F0] rounded-full text-black">
                   <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    name={p.name}
                    price={p.price}
                    originalPrice={p.originalPrice}
                    discount={p.discount}
                    rating={p.rating}
                    ratingCount={String(p.reviewCount)}
                    productId={p.id}
                    imageUrl={p.imageUrl}
                  />
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-black/50 text-xl font-medium">
                  No products found matching your filters.
                </div>
              )}
            </div>

            {paginatedProducts.length > 0 && (
              <div className="w-full h-px bg-black/10 mt-10 mb-5" />
            )}

            {/* Pagination */}
            {paginatedProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>

      <div className="mt-10">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
