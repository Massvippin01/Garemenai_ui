import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 pt-10 pb-16 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1 max-w-[700px]">
          {/* Star decoration */}
          <div className="flex items-start gap-4 mb-2">
            <h1
              className="text-[clamp(48px,8vw,96px)] font-extrabold leading-[0.95] text-black uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              FIND CLOTHS
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>
            <span className="text-4xl mt-2 hidden lg:block">✦</span>
          </div>

          <p
            className="text-sm sm:text-base text-black leading-[1.3] max-w-[696px] mt-6 mb-6 sm:mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Buy clothes that don&apos;t just follow trends—choose pieces that match your style,
            fit your body perfectly, and make you feel confident every time you wear them.
            Stay updated with the latest fashion, but prioritize comfort, quality, and the
            right fit to create a look that truly represents you.
          </p>

          <Link
            href="/category"
            className="flex sm:inline-flex items-center justify-center w-full sm:w-auto bg-[#1B1B1D] text-white rounded-full px-16 py-4 text-base font-medium hover:bg-black/80 transition-colors mb-2 sm:mb-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Shop Now
          </Link>

          {/* Stats */}
          {/* Stats */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-x-4 gap-y-6 sm:gap-8 mt-8 sm:mt-10">
            <div className="flex flex-col">
              <span className="text-[32px] sm:text-[40px] font-bold leading-tight sm:leading-[54px] text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>200+</span>
              <span className="text-[12px] sm:text-base text-black/60 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>International Brands</span>
            </div>
            <div className="hidden sm:block w-px h-[74px] bg-black/10" />
            <div className="flex flex-col">
              <span className="text-[32px] sm:text-[40px] font-bold leading-tight sm:leading-[54px] text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>2,000+</span>
              <span className="text-[12px] sm:text-base text-black/60 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>High-Quality Products</span>
            </div>
            <div className="hidden sm:block w-px h-[74px] bg-black/10" />
            <div className="col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left mt-2 sm:mt-0">
              <span className="text-[32px] sm:text-[40px] font-bold leading-tight sm:leading-[54px] text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>30,000+</span>
              <span className="text-[12px] sm:text-base text-black/60 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Right — Hero Image */}
        <div className="lg:absolute lg:right-0 lg:top-0 w-full lg:w-[559px] h-[400px] lg:h-[585px] flex items-center justify-center overflow-hidden">
          <div className="w-full h-full relative">
            {/* Model Image */}
            <img 
              src="/images/modelsss.png" 
              alt="Fashion Models" 
              className="w-full h-full object-cover rounded-3xl lg:rounded-none"
            />
            {/* Big Star (Mobile: Mid-Left, Desktop: Top-Right) */}
            <svg className="absolute top-[10%] sm:top-8 left-0 sm:left-auto sm:right-8 w-[40px] sm:w-[104px] h-[40px] sm:h-[104px] animate-pulse" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M52 0.5L62.5 37.5L99.5 48L62.5 58.5L52 95.5L41.5 58.5L4.5 48L41.5 37.5L52 0.5Z" fill="black"/>
            </svg>
            {/* Small Star (Mobile: Mid-Right, Desktop: Bottom-Left) */}
            <svg className="absolute top-1/4 sm:top-auto sm:bottom-1/4 right-2 sm:right-auto sm:left-8 w-[25px] sm:w-[56px] h-[25px] sm:h-[56px] animate-[pulse_3s_ease-in-out_infinite]" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 0.5L34 20.5L54 26.5L34 32.5L28 52.5L22 32.5L2 26.5L22 20.5L28 0.5Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
