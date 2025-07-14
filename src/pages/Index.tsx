import { FC, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNeo from "@/components/BackgroundNeo";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import GlassCard from "@/components/GlassCard";
import DurationModal from "@/components/DurationModal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
//  Sample product data (kept exactly as you had it)
// ---------------------------------------------------------------------------
const product = {
  id: "2",
  name: "External Chair",
  price: 34.99,
  image: "/lovable-uploads/Product-external.png",
  category: "DMA",
  status: "Undetected",
  headline: "It's not cheating if you don't get caught.",
  description:
    "With the proper settings, Azec's External features will bypass Ricochet. High-performance, undetected hacks at unbeatable prices, backed by premium customer support.",
};

const unlockAllProduct = {
  id: "3",
  name: "Unlock All Lifetime",
  price: 34.99,
  image: "/lovable-uploads/Product-Unlockall.png",
  category: "Unlocks",
  status: "Undetected",
  headline: "Unlock every camo, attachment, and operator instantly!",
  description:
    "Unlock all camos, attachments, operators, and more in seconds. Safe, fast, and undetected. Works for all accounts and is backed by our premium support.",
};

// ---------------------------------------------------------------------------
//  Page component
// ---------------------------------------------------------------------------
const Index: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = () => {
    setIsModalOpen(true);
  };



  return (
    <div className="relative min-h-screen">
      {/* background / chrome */}
      <BackgroundNeo />
      <Header />

      {/* ------------------------------------------------------------ */}
      {/* main content */}
      {/* ------------------------------------------------------------ */}
      <main className="container relative z-10 mx-auto px-6 py-12 pt-32">
        <div>
          {/* headline */}
          <div className="mb-6 text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-6xl">
              {t("store_headline")}
          </h1>
            <div className="flex justify-center mt-4">
              <Link to="/reviews" className="group">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/40 bg-green-400/20 backdrop-blur-lg shadow-lg text-green-200 font-semibold text-sm transition group-hover:scale-105 group-hover:bg-green-400/30">
                  <svg className="w-4 h-4 text-green-300/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 3L4 7v5c0 5.25 4.5 9.25 8 10 3.5-.75 8-4.75 8-10V7l-8-4z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                  </svg>
                  {t('trusted_by_customers')} <span className="font-bold text-green-300/90">4.23</span>
                  <svg className="w-4 h-4 ml-1 text-green-300/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>

                    {/* ----------------------------------------------------------------- */}
          {/* Bundle Deal section (glass card) - FIRST POSITION                 */}
          {/* ----------------------------------------------------------------- */}
          <GlassCard
            className="mx-auto mb-20 flex w-full max-w-6xl flex-col gap-12 rounded-3xl border border-white/20 p-8"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* =============================================================== */}
            {/* bundle showcase row                                             */}
            {/* =============================================================== */}
            <div className="flex flex-col items-center gap-8 lg:flex-row">
              {/* ------------ LEFT : text + buttons -------------------------- */}
              <div className="mx-auto flex min-w-[280px] max-w-lg flex-col items-start justify-center gap-8">
                {/* badge */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-green-500/80 px-3 py-1 text-xs font-semibold text-white shadow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M13 2L3 14H12L11 22L21 10H13L13 2Z"
                        fill="#fff"
                      />
                    </svg>
                    {t("bundle_badge")}
                  </span>
                </div>

                {/* title */}
                <h2 className="mb-2 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  {t("bundle_title")}
                </h2>

                {/* description */}
                <p className="mb-6 text-base text-white/60">
                  {t("bundle_desc")}
                </p>

                {/* pricing info */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-2xl font-bold text-green-400">{t("bundle_price")}</span>
                  <span className="text-lg text-white/50 line-through">{t("bundle_original_price")}</span>
                  <span className="text-sm font-semibold text-green-400">{t("bundle_savings")}</span>
                </div>

                {/* ---------------- BUTTONS (FIXED!) ------------------------ */}
                <div className="flex gap-4 w-full items-stretch">
                  <Link to="/reviews" className="flex-1 w-full h-16 bg-white text-black font-semibold rounded-xl transition hover:bg-white/90 text-center flex flex-col items-center justify-center px-4">
                    <span className="mt-1">{t('read_faq')}</span>
                    <span className="text-xs text-black/70 font-normal mt-0.5">{t('they_speak_for_us')}</span>
                  </Link>
                  <button 
                    onClick={() => window.open("https://buy.stripe.com/eVq8wP0iqeVk9Ud2GB6AM0d", '_blank')}
                    className="flex-1 w-full h-16 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition text-center flex flex-col items-center justify-center px-4"
                  >
                    <span>{t('buy_now')}</span>
                    <span className="text-xs text-white/70 font-normal mt-0.5">{t("bundle_price")}</span>
                  </button>
                </div>
              </div>

              {/* ------------ RIGHT : product image ------------------------- */}
              <div className="flex flex-1 items-center justify-center">
                <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-2xl">
                  <img
                    src="/lovable-uploads/Product-bundle.png"
                    alt={t("bundle_title")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* ----------------------------------------------------------------- */}
          {/* External Chair product + features section (glass card)            */}
          {/* ----------------------------------------------------------------- */}
          <GlassCard
            className="mx-auto mb-20 flex w-full max-w-6xl flex-col gap-12 rounded-3xl border border-white/20 p-8"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* =============================================================== */}
            {/* product showcase row                                           */}
            {/* =============================================================== */}
            <div className="flex flex-col items-center gap-8 lg:flex-row">
              {/* ------------ LEFT : text + buttons -------------------------- */}
              <div className="mx-auto flex min-w-[280px] max-w-lg flex-col items-start justify-center gap-8">
                {/* badge */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#810D0A]/80 px-3 py-1 text-xs font-semibold text-white shadow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M13 2L3 14H12L11 22L21 10H13L13 2Z"
                        fill="#fff"
                      />
                    </svg>
                    {t("undetected")}
                  </span>
                </div>

                {/* title */}
                <h2 className="mb-2 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  {t("external_chair")}
                </h2>

                {/* description */}
                <p className="mb-6 text-base text-white/60">
                  {t("external_chair_desc")}
                </p>

                {/* ---------------- BUTTONS (FIXED!) ------------------------ */}
                {/* Both buttons are given an identical fixed height (h-20 == 80 px) */}
                {/* Content is perfectly centered with flex utilities          */}
                <div className="flex gap-4 w-full items-stretch">
                  <Link to="/reviews" className="flex-1 w-full h-16 bg-white text-black font-semibold rounded-xl transition hover:bg-white/90 text-center flex flex-col items-center justify-center px-4">
                    <span className="mt-1">{t('read_faq')}</span>
                    <span className="text-xs text-black/70 font-normal mt-0.5">{t('they_speak_for_us')}</span>
                  </Link>
                  <button onClick={handlePurchase} className="flex-1 w-full h-16 bg-[#810D0A] hover:bg-[#a11a16] text-white font-semibold rounded-xl transition text-center flex flex-col items-center justify-center px-4">
                    <span>{t('buy_now')}</span>
                    <span className="text-xs text-white/70 font-normal mt-0.5">starting at $2.99</span>
                  </button>
                </div>
              </div>

              {/* ------------ RIGHT : product image ------------------------- */}
              <div className="flex flex-1 items-center justify-center">
                <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-2xl">
                  <img
                    src={product.image}
                    alt={t("external_chair")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* feature cards row                                              */}
            {/* =============================================================== */}
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
              {/* card 1 */}
              <div className="flex flex-col items-center rounded-2xl border border-white/20 p-8">
                <div className="mb-6 flex w-full justify-center">
                  <img
                    src="/Ban2.png"
                    alt={t("feature1_alt")}
                    className="max-h-48 w-auto rounded-2xl object-contain"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-white">
                  {t("feature1_title")}
                </h3>
              </div>

              {/* card 2 */}
              <div className="flex flex-col items-center rounded-2xl border border-white/20 p-8">
                <div className="mb-6 flex w-full justify-center">
                  <img
                    src="/Ban1.png"
                    alt={t("feature2_alt")}
                    className="max-h-48 w-auto rounded-2xl object-contain"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-white">
                  {t("feature2_title")}
                </h3>
              </div>
            </div>
          </GlassCard>

          {/* ----------------------------------------------------------------- */}
          {/* Unlock All product + features section (glass card)                */}
          {/* ----------------------------------------------------------------- */}
          <GlassCard
            className="mx-auto mb-20 flex w-full max-w-6xl flex-col gap-12 rounded-3xl border border-white/20 p-8"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* =============================================================== */}
            {/* product showcase row                                           */}
            {/* =============================================================== */}
            <div className="flex flex-col items-center gap-8 lg:flex-row">
              {/* ------------ LEFT : text + buttons -------------------------- */}
              <div className="mx-auto flex min-w-[280px] max-w-lg flex-col items-start justify-center gap-8">
                {/* badge */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#810D0A]/80 px-3 py-1 text-xs font-semibold text-white shadow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M13 2L3 14H12L11 22L21 10H13L13 2Z"
                        fill="#fff"
                      />
                    </svg>
                    {t("undetected")}
                  </span>
                </div>

                {/* title */}
                <h2 className="mb-2 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  {t("unlockall_title")}
                </h2>

                {/* description */}
                <p className="mb-6 text-base text-white/60">
                  {t("unlockall_desc")}
                </p>

                {/* ---------------- BUTTONS (FIXED!) ------------------------ */}
                <div className="flex gap-4 w-full items-stretch">
                  <Link to="/reviews" className="flex-1 w-full h-16 bg-white text-black font-semibold rounded-xl transition hover:bg-white/90 text-center flex flex-col items-center justify-center px-4">
                    <span className="mt-1">{t('read_faq')}</span>
                    <span className="text-xs text-black/70 font-normal mt-0.5">{t('they_speak_for_us')}</span>
                  </Link>
                  <button 
                    onClick={() => window.open("https://buy.stripe.com/eVqcN50iqeVk0jD94Z6AM0h", '_blank')}
                    className="flex-1 w-full h-16 bg-[#810D0A] hover:bg-[#a11a16] text-white font-semibold rounded-xl transition text-center flex flex-col items-center justify-center px-4"
                  >
                    <span>{t('buy_now')}</span>
                    <span className="text-xs text-white/70 font-normal mt-0.5">Lifetime · $34.99</span>
                  </button>
                </div>
              </div>

              {/* ------------ RIGHT : product image ------------------------- */}
              <div className="flex flex-1 items-center justify-center">
                <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-2xl">
                  <img
                    src={unlockAllProduct.image}
                    alt={t("unlockall_title")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* stats + features */}
        <StatsSection />
        <FeaturesSection />
      </main>

      <Footer />
      
      {/* Duration Selection Modal */}
      <DurationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
