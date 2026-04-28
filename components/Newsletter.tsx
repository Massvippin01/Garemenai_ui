"use client";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="bg-black rounded-[20px] px-6 sm:px-10 md:px-16 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 text-center md:text-left">
          <h3
            className="text-white font-bold text-[clamp(24px,3vw,40px)] leading-[1.12] max-w-[551px] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h3>

          <div className="flex flex-col gap-3 w-full md:w-[349px] shrink-0">
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3">
              <Mail size={20} className="text-black/40 shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-sm text-black placeholder-black/40 outline-none w-full"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
            <button
              className="bg-white rounded-full py-3 text-center text-base font-medium text-black hover:bg-gray-100 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
