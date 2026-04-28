import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "COMPANY",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "HELP",
    links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "RESOURCES",
    links: ["Free eBooks", "Development Tutorial", "How to - Blog", "YouTube Playlist"],
  },
];

const paymentMethods = ["VISA", "MC", "PP", "PAY", "G"];

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-10 pb-8">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-row gap-8 lg:gap-10 justify-between mb-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col gap-6 max-w-full lg:max-w-[250px] mb-4 lg:mb-0">
            <Link href="/">
              <span
                className="text-3xl font-extrabold text-black hover:opacity-80 transition-opacity block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                CELESTIALS.CO
              </span>
            </Link>
            <p className="text-sm text-black/60 leading-[22px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Twitter, bg: "bg-white border border-black/20", iconColor: "text-black" },
                { Icon: Facebook, bg: "bg-black", iconColor: "text-white" },
                { Icon: Instagram, bg: "bg-white border border-black/20", iconColor: "text-black" },
                { Icon: Github, bg: "bg-white border border-black/20", iconColor: "text-black" },
              ].map(({ Icon, bg, iconColor }, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${bg} hover:opacity-80 transition-opacity`}
                >
                  <Icon size={14} className={iconColor} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-6">
              <span
                className="text-sm font-medium tracking-[3px] uppercase text-black"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {title}
              </span>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm text-black/60 hover:text-black transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-black/10 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-sm text-black/60"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © 2026, All rights reserved
          </p>

          {/* Payment badges */}
          <div className="flex gap-3 items-center">
            <div className="bg-white border border-[#D6DCE5] rounded-[5px] w-[46px] h-[30px] flex items-center justify-center shadow-sm overflow-hidden p-1 relative">
              <Image src="/images/visa.png" alt="Visa" fill className="object-contain p-1" />
            </div>
            <div className="bg-white border border-[#D6DCE5] rounded-[5px] w-[46px] h-[30px] flex items-center justify-center shadow-sm overflow-hidden p-1 relative">
              <Image src="/images/mastercard.png" alt="Mastercard" fill className="object-contain p-1" />
            </div>
            <div className="bg-white border border-[#D6DCE5] rounded-[5px] w-[46px] h-[30px] flex items-center justify-center shadow-sm overflow-hidden p-1 relative">
              <Image src="/images/Paypal.png" alt="PayPal" fill className="object-contain p-1" />
            </div>
            <div className="bg-white border border-[#D6DCE5] rounded-[5px] w-[46px] h-[30px] flex items-center justify-center shadow-sm overflow-hidden p-1 relative">
              <Image src="/images/apple_pay.png" alt="Apple Pay" fill className="object-contain p-[6px]" />
            </div>
            <div className="bg-white border border-[#D6DCE5] rounded-[5px] w-[46px] h-[30px] flex items-center justify-center shadow-sm overflow-hidden p-1 relative">
              <Image src="/images/G Pay.png" alt="Google Pay" fill className="object-contain p-1" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
