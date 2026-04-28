import { notFound } from "next/navigation";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import YouMightAlsoLike from "@/components/product/YouMightAlsoLike";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { PRODUCTS, REVIEWS, SIMILAR_PRODUCTS } from "@/lib/data";

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((id) => ({ id }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS[params.id];

  if (!product) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Men", href: "/shop/men" },
    { label: "T-shirts", href: "/shop/men/tshirts" },
    { label: product.name },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Navbar />

      <div className="max-w-[1440px] mx-auto">
        <Breadcrumb items={breadcrumbs} />

        {/* Main product section */}
        <section className="max-w-[1240px] mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>
        </section>

        {/* Tabs section */}
        <ProductTabs 
          productId={product.id}
          reviews={REVIEWS.filter(r => r.productId === product.id)} 
          reviewCount={product.reviewCount} 
        />

        {/* You Might Also Like */}
        <YouMightAlsoLike products={SIMILAR_PRODUCTS} />

        {/* Newsletter */}
        <Newsletter />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
