"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const brands = [
  { src: "/images/versace.png", alt: "Versace" },
  { src: "/images/Gucci_Logo_0 1.png", alt: "Gucci" },
  { src: "/images/Prada.png", alt: "Prada" },
  { src: "/images/calvin.png", alt: "Calvin Klein" },
  { src: "/images/r.png", alt: "R Logo" },
];

export default function BrandsBar() {
  return (
    <div className="py-8 md:py-10 bg-[#151517]">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-24 md:gap-40 flex-none pr-24 md:pr-40 items-center"
          animate={{ translateX: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* First set */}
          {brands.map((brand, i) => (
            <Image
              key={`a-${i}`}
              src={brand.src}
              alt={brand.alt}
              width={120}
              height={30}
              className="h-[25px] md:h-[33px] w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
          {/* Second set for seamless loop */}
          {brands.map((brand, i) => (
            <Image
              key={`b-${i}`}
              src={brand.src}
              alt={brand.alt}
              width={120}
              height={30}
              className="h-[25px] md:h-[33px] w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
