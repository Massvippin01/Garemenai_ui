"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, Ruler, Settings, Store } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  useEffect(() => setMounted(true), []);

  return (
    <nav className="w-full px-6 py-4 sticky top-0 z-50">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between bg-white/60 backdrop-blur-xl border border-black/20 rounded-[21px] px-6 py-3 h-[72px] shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="font-extrabold text-2xl tracking-tight text-black leading-none">
            CELESTIALS
          </span>
          <span className="font-extrabold text-2xl tracking-tight leading-none" style={{ color: "#FDBB30" }}>
            .CO
          </span>
        </Link>

        {/* Nav Links - desktop */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
          <Link href="/category" className="hover:opacity-60 transition-opacity flex items-center gap-1">
            Shop <span className="text-xs">▾</span>
          </Link>
          <Link href="/category" className="hover:opacity-60 transition-opacity">On Sale</Link>
          <Link href="/category" className="hover:opacity-60 transition-opacity">New Arrivals</Link>
          <Link href="/category" className="hover:opacity-60 transition-opacity">Brands</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#D9D9D9] rounded-[19px] px-4 py-2 gap-3 w-[295px]">
          <span className="text-black/40">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search Products..."
            className="bg-transparent text-sm text-black placeholder-black/60 outline-none w-full font-['DM_Sans']"
          />
          <button className="bg-[#1B1B1D] rounded-full p-1 flex items-center justify-center">
            <Search size={14} className="text-white" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <Link href="/cart" className="bg-[#1B1B1D] rounded-full p-2 hidden md:flex items-center justify-center relative relative">
            <ShoppingBag size={20} className="text-white" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <div className="hidden md:flex items-center justify-center">
            {isLoaded && !isSignedIn && (
              <SignInButton mode="modal">
                <button className="bg-[#1B1B1D] rounded-full px-5 py-2 text-white text-sm font-medium hover:bg-black/80 transition-colors">
                  Login
                </button>
              </SignInButton>
            )}
            {isLoaded && isSignedIn && (
              <UserButton 
                appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }}
                userProfileMode="navigation"
                userProfileUrl="/profile"
              >
                <UserButton.MenuItems>
                  <UserButton.Action label="manageAccount" />
                  <UserButton.Link
                    label="Retailer Dashboard"
                    labelIcon={<Store size={15} />}
                    href="/dashboard"
                  />
                </UserButton.MenuItems>
              </UserButton>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border border-black rounded-2xl mt-2 px-6 py-4 flex flex-col gap-4 max-w-[1240px] mx-auto">
          <div className="flex items-center bg-[#D9D9D9] rounded-[19px] px-4 py-2 gap-3">
            <Search size={16} className="text-black/40" />
            <input
              type="text"
              placeholder="Search Products..."
              className="bg-transparent text-sm text-black placeholder-black/60 outline-none w-full"
            />
          </div>
          {["Shop", "On Sale", "New Arrivals", "Brands"].map((item) => (
            <Link key={item} href="/category" className="text-sm font-medium text-black hover:opacity-60">
              {item}
            </Link>
          ))}
          <div className="flex gap-3">
            <Link href="/cart" className="bg-[#1B1B1D] rounded-full p-2 relative">
              <ShoppingBag size={20} className="text-white" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="flex items-center justify-center">
              {isLoaded && !isSignedIn && (
                <SignInButton mode="modal">
                  <button className="bg-[#1B1B1D] rounded-full px-5 py-2 text-white text-sm font-medium">
                    Login
                  </button>
                </SignInButton>
              )}
              {isLoaded && isSignedIn && (
                <UserButton 
                  appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }}
                  userProfileMode="navigation"
                  userProfileUrl="/profile"
                >
                  <UserButton.MenuItems>
                    <UserButton.Action label="manageAccount" />
                    <UserButton.Link
                      label="Retailer Dashboard"
                      labelIcon={<Store size={15} />}
                      href="/dashboard"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
