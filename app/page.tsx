import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandsBar from "@/components/BrandsBar";
import NewArrivals from "@/components/NewArrivals";
import TopSelling from "@/components/TopSelling";
import BrowseByStyle from "@/components/BrowseByStyle";
import CustomerReviews from "@/components/CustomerReviews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E9E9E9]">
      <Navbar />
      <Hero />
      <BrandsBar />
      <NewArrivals />
      <TopSelling />
      <BrowseByStyle />
      <CustomerReviews />
      <Newsletter />
      <Footer />
    </main>
  );
}
