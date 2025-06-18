/* components/StatsSection.tsx */
import React from "react";

const stats = [
  { value: "445", label: "Products Sold" },
  { value: "356", label: "Total Customers" },
  { value: "425", label: "Reviews Received" },
  { value: "4.23", label: "Average Rating" },
] as const;

const StatsSection: React.FC = () => (
  <section className="w-full flex flex-col items-center justify-center mt-24 mb-16">
    <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">Our Numbers Speak for Themselves</h2>
    <div className="grid w-full max-w-6xl grid-cols-2 md:grid-cols-4 gap-6 px-6">
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="
            relative flex flex-col items-center justify-center
            rounded-2xl p-8
            border border-white/10 backdrop-blur-lg
            bg-white/5 hover:bg-white/10
            ring-1 ring-inset ring-white/5 hover:ring-white/20
            shadow-[0_8px_28px_rgba(0,0,0,0.45)]
            transition-[background,ring,shadow] duration-300
          "
        >
          <span
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white via-gray-100/90 to-gray-400/70 bg-clip-text text-transparent mb-1"
            style={{letterSpacing: "0.01em"}}
          >
            {value}
          </span>
          <span className="mt-2 text-xs md:text-sm uppercase tracking-wider text-white/80 text-center">
            {label}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
