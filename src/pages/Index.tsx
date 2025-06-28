import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundNeo from "@/components/BackgroundNeo";
import { Product } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import GlassCard from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const product = {
  id: "2",
  name: "External Chair",
  price: 4.99,
  image: "/lovable-uploads/Product-external.png",
  category: "DMA",
  status: "Undetected",
  headline: "It's not cheating if you don't get caught.",
  description: "With the proper settings, Azec's External features will bypass Ricochet. High-performance, undetected hacks at unbeatable prices, backed by premium customer support.",
};

const Index = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handlePurchase = () => {
    toast({
      title: t('redirecting_checkout'),
      description: t('processing_payment', { product: t('external_chair') }),
    });
    console.log("Processing direct checkout for product:", product);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundNeo />
      <Header />

      <main className="container mx-auto px-6 py-12 relative z-10 pt-32">
        <div>
          <div className="text-center mb-16">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              {t('store_headline')}
            </h1>
          </div>

          {/* Unified Product + Features Section */}
          <GlassCard
            className="w-full max-w-6xl mx-auto rounded-3xl p-8 mb-20 border border-white/20 flex flex-col gap-12"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
          >
            {/* Product Showcase Row */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left: Text and Buttons */}
              <div className="flex flex-col justify-center items-start gap-8 min-w-[280px] max-w-lg mx-auto">
                {/* Badge/Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#810D0A]/80 text-white shadow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14H12L11 22L21 10H13L13 2Z" fill="#fff"/>
                    </svg>
                    {t('undetected')}
                  </span>
                </div>
                {/* Headline */}
                <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                  {t('external_chair')}
                </h2>
                {/* Description */}
                <p className="text-white/60 text-base mb-6">
                  {t('external_chair_desc')}
                </p>
                {/* Buttons */}
                <div className="flex gap-4 w-full">
                  <Link to="/faq" className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-xl transition hover:bg-white/90 text-center">{t('read_faq')}</Link>
                  <button onClick={handlePurchase} className="flex-1 bg-[#810D0A] hover:bg-[#a11a16] text-white font-semibold py-3 px-6 rounded-xl transition text-center">{t('buy_now')}</button>
                </div>
              </div>
              {/* Right: Product Image */}
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden flex items-center justify-center">
                  <img src={product.image} alt={t('external_chair')} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Feature Cards Row - Large Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Card 1: Left - Ban2.png large image */}
              <div className="rounded-2xl p-8 flex flex-col items-center border border-white/20">
                <div className="mb-6 w-full flex justify-center">
                  <img src="/Ban2.png" alt={t('feature1_alt')} className="max-h-48 w-auto object-contain rounded-2xl" />
                </div>
                <h3 className="text-white text-xl font-bold text-center mb-2">{t('feature1_title')}</h3>
              </div>
              {/* Card 2: Right - Ban1.png large image */}
              <div className="rounded-2xl p-8 flex flex-col items-center border border-white/20">
                <div className="mb-6 w-full flex justify-center">
                  <img src="/Ban1.png" alt={t('feature2_alt')} className="max-h-48 w-auto object-contain rounded-2xl" />
                </div>
                <h3 className="text-white text-xl font-bold text-center mb-2">{t('feature2_title')}</h3>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
