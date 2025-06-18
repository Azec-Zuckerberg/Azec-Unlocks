import { ShieldCheck, Zap, RefreshCw, Wallet, Gem, Headphones } from 'lucide-react';

const features = [
  {
    title: 'Security',
    desc: 'Security is one of our highest priorities, we are constantly improving our software to stay undetected.'
  },
  {
    title: 'Instant access',
    desc: 'Registration and checkout is quick and easy. You can start using your product right after buying your license.'
  },
  {
    title: 'Fast updates',
    desc: 'All our products are updated after each game update, all down time is compensated.'
  },
  {
    title: 'Compensation',
    desc: 'If one of our products goes down for any reason, the time will always be compensated.'
  },
  {
    title: 'Premium quality',
    desc: 'The best of its class, our software is the standard at which all others are measured.'
  },
  {
    title: '24/7 Support',
    desc: 'Get help when you need it, round the clock. Our support team is available 24/7.'
  },
];

const FeaturesSection = () => (
  <section className="w-full max-w-6xl mx-auto py-16 px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 tracking-tight">
      Why choose us
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((f, i) => (
        <div
          key={f.title}
          className="glass-card flex flex-col items-center gap-4 p-8 h-full min-h-[200px] shadow-lg border border-white/10 rounded-2xl"
        >
          <h3 className="text-white text-xl font-semibold mt-2 mb-1 text-center">{f.title}</h3>
          <p className="text-white/70 text-base leading-relaxed text-center">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection; 