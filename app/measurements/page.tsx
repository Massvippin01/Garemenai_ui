import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function MeasurementsPage() {
  // Protect this specific route
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-[1240px] w-full mx-auto px-6 py-16">
        <div className="bg-[#F0F0F0] rounded-[40px] p-10 md:p-16 flex flex-col items-center justify-center min-h-[500px]">
          <h1 className="text-3xl md:text-5xl font-black uppercase text-center mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Add Measurements
          </h1>
          <p className="text-black/60 text-center max-w-[600px] mb-10">
            Upload a full body image so our AI model can extract your exact measurements to build your intelligent fitting profile.
          </p>
          
          <div className="w-full max-w-[400px] aspect-[3/4] border-2 border-dashed border-black/20 rounded-[20px] flex flex-col items-center justify-center bg-white cursor-pointer hover:border-black/50 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-black/40 mb-4">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="font-medium text-black">Upload Image</span>
            <span className="text-sm text-black/50 mt-1">PNG, JPG up to 10MB</span>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
