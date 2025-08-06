import { Shield, Zap, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const quickLinks = [
    t("store"), t("faq"), t("contact"), t("guides")
  ];

  const paymentMethods = [
    { name: "Mastercard", color: "bg-red-500" },
    { name: "Visa", color: "bg-blue-500" },
    { name: "PayPal", color: "bg-blue-600" },
    { name: "Crypto", color: "bg-amber-500" }
  ];

  return (
    <footer className="relative mt-12 sm:mt-20 border-t border-white/10">
      {/* Decorative glow line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[$#B70000] to-transparent"></div>
      
      <div className="glass-card border-0 rounded-none">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Brand Section */}
            <div className="space-y-3 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/80 border-2 border-[#810D0A] shadow-[0_0_16px_2px_rgba(129,13,10,0.4)] overflow-hidden">
                  <img src="/lovable-uploads/AzecLogo.png" alt="Azec Logo" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
                </div>
                <span className="text-white font-bold text-lg sm:text-2xl tracking-tight">Azec Unlocks</span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xs">
                {t('footer_brand_desc')}
              </p>
              {/* Payment Methods */}
              <div className="space-y-1">
                <div className="flex flex-wrap gap-2 items-center justify-start">
                  <img src="/payment-logos/Visa.png" alt="Visa" className="h-2 sm:h-3 w-auto" />
                  <img src="/payment-logos/Mastercard.png" alt="Mastercard" className="h-4 sm:h-6 w-auto" />
                  <img src="/payment-logos/Paypal.png" alt="PayPal" className="h-10 sm:h-14 w-auto" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
              <div className="space-y-3">
              <h3 className="text-white font-semibold text-base sm:text-lg">{t('footer_quick_links')}</h3>
              <div className="space-y-2">
                {['/', '/faq', '/contact', '/guides', '/reviews', '/terms-of-service'].map((to, index) => (
                  <div key={index} className="flex items-center space-x-2 group">
                    <div className="w-1 h-1 bg-[$#B70000] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <Link to={to} className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                      {[
                        t('store'),
                        t('faq'),
                        t('contact'),
                        t('guides'),
                        t('reviews'),
                        t('terms_of_service')
                      ][index]}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-base sm:text-lg">{t('footer_why_choose_us')}</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 group">
                  <div className="glass-card-hover p-2 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.20)',
                    borderRadius: '0.5rem',
                  }}>
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[$#B70000]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-xs sm:text-sm font-medium">{t('footer_secure_safe')}</p>
                    <p className="text-white/60 text-xs">{t('footer_secure_safe_desc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="glass-card-hover p-2 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.20)',
                    borderRadius: '0.5rem',
                  }}>
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[$#B70000]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-xs sm:text-sm font-medium">{t('footer_fast_delivery')}</p>
                    <p className="text-white/60 text-xs">{t('footer_fast_delivery_desc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="glass-card-hover p-2 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.20)',
                    borderRadius: '0.5rem',
                  }}>
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[$#B70000]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-xs sm:text-sm font-medium">{t('footer_quality_assured')}</p>
                    <p className="text-white/60 text-xs">{t('footer_quality_assured_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
