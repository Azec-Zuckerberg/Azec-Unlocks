/* components/StatsSection.tsx */
import React from "react";
import { useTranslation } from "react-i18next";

const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  const stats = [
    { value: "168", label: t('stats_products_sold') },
    { value: "2022", label: 'SELLING SINCE' },
    { value: "25", label: t('stats_reviews_received') },
    { value: "4.23", label: t('stats_average_rating') },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center mt-16 sm:mt-24 mb-12 sm:mb-16">
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">{t('stats_title')}</h2>
      <div className="grid w-full max-w-6xl grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="
              relative flex flex-col items-center justify-center
              rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8
              border border-white/10 backdrop-blur-lg
              bg-white/5 hover:bg-white/10
              ring-1 ring-inset ring-white/5 hover:ring-white/20
              shadow-[0_8px_28px_rgba(0,0,0,0.45)]
              transition-[background,ring,shadow] duration-300
            "
          >
            <span
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-br from-white via-gray-100/90 to-gray-400/70 bg-clip-text text-transparent mb-1"
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
};

export default StatsSection;
