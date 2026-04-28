const styles = [
  { name: "Casual", span: "col-span-1", height: "h-[289px]", bg: "bg-white" },
  { name: "Formal", span: "col-span-2", height: "h-[289px]", bg: "bg-white" },
  { name: "Party", span: "col-span-2", height: "h-[289px]", bg: "bg-white" },
  { name: "Gym", span: "col-span-1", height: "h-[289px]", bg: "bg-white" },
];

export default function BrowseByStyle() {
  return (
    <section className="py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="bg-[#F0F0F0] rounded-[40px] p-6 sm:p-10 md:p-16">
          <h2
            className="text-center text-[clamp(28px,4vw,48px)] font-bold text-black mb-10 uppercase tracking-wide"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            BROWSE BY DRESS STYLE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1 */}
            <div className="md:col-span-1 bg-white rounded-[20px] h-[190px] sm:h-[289px] relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow">
              <img src="/images/style_casual.png" alt="Casual" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <span
                className="absolute top-4 sm:top-6 left-4 sm:left-8 text-[24px] sm:text-[36px] font-bold text-black z-10 bg-white/70 px-3 sm:px-4 py-1 rounded backdrop-blur-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Casual
              </span>
            </div>

            <div className="md:col-span-2 bg-white rounded-[20px] h-[190px] sm:h-[289px] relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow">
              <img src="/images/style_formal.png" alt="Formal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <span
                className="absolute top-4 sm:top-6 left-4 sm:left-8 text-[24px] sm:text-[36px] font-bold text-black z-10 bg-white/70 px-3 sm:px-4 py-1 rounded backdrop-blur-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Formal
              </span>
            </div>

            {/* Row 2 */}
            <div className="md:col-span-2 bg-white rounded-[20px] h-[190px] sm:h-[289px] relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow">
              <img src="/images/style_party.png" alt="Party" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <span
                className="absolute top-4 sm:top-6 left-4 sm:left-8 text-[24px] sm:text-[36px] font-bold text-black z-10 bg-white/70 px-3 sm:px-4 py-1 rounded backdrop-blur-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Party
              </span>
            </div>

            <div className="md:col-span-1 bg-white rounded-[20px] h-[190px] sm:h-[289px] relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow">
              <img src="/images/style_gym.png" alt="Gym" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <span
                className="absolute top-4 sm:top-6 left-4 sm:left-8 text-[24px] sm:text-[36px] font-bold text-black z-10 bg-white/70 px-3 sm:px-4 py-1 rounded backdrop-blur-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Gym
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
