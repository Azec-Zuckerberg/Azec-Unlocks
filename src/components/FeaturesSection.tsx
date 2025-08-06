import { ShieldCheck, Zap, RefreshCw, Wallet, Gem, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = [
    { title: t('feature_security_title'), desc: t('feature_security_desc') },
    { title: t('feature_instant_title'), desc: t('feature_instant_desc') },
    { title: t('feature_updates_title'), desc: t('feature_updates_desc') },
    { title: t('feature_compensation_title'), desc: t('feature_compensation_desc') },
    { title: t('feature_quality_title'), desc: t('feature_quality_desc') },
    { title: t('feature_support_title'), desc: t('feature_support_desc') },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-8 sm:py-16 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12 tracking-tight">
        {t('why_choose_us')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass-card flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 h-full min-h-[160px] sm:min-h-[200px] border border-white/10 rounded-xl sm:rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.20)',
              borderRadius: '1rem',
            }}
          >
            <h3 className="text-white text-lg sm:text-xl font-semibold mt-2 mb-1 text-center">{f.title}</h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed text-center">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection; 