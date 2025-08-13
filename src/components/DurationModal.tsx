import React from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedGlass from './OptimizedGlass';

interface DurationOption {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  bestDeal?: boolean;
  mostPopular?: boolean;
  description: string;
}

const popupAnimation = `
@keyframes popup {
  0% { opacity: 0; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1); }
}
.duration-modal-popup { animation: popup 0.35s cubic-bezier(0.22,1,0.36,1); }
`;

const DurationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  
  // Stripe links for each product/plan
  const stripeLinks: Record<string, string> = {
    "2h": "https://buy.stripe.com/00w9ATe9geVk9Uddlf6AM0f",
    "daily": "https://buy.stripe.com/14AeVd5CKdRgd6p94Z6AM0g",
    "monthly": "https://buy.stripe.com/7sY00je9gfZo6I1gxr6AM0o",
    "lifetime": "https://buy.stripe.com/28E5kDaX4cNc0jD0yt6AM0q",
    "unlockall": "https://buy.stripe.com/aFa28rc185kK8Q9ftn6AM0c",
  };

  // Plan pricing in USD
  const plans = {
    '2h': { usd: '$2.99' },
    'daily': { usd: '$10.99' },
    'monthly': { usd: '$29.99' },
    'lifetime': { usd: '$79.99' },
  };

  const options: DurationOption[] = [
    { id: '2h', name: t('2HoursLicense'), price: '$2.99', description: t('bestForTesting') },
    { id: 'daily', name: t('dailyLicense'), price: '$10.99', description: t('idealForExtensiveTesting') },
    { id: 'monthly', name: t('monthlyLicense'), price: '$29.99', mostPopular: true, description: t('unlimitedAccessOneTimePayment') },
    { id: 'lifetime', name: t('lifetimeLicense'), price: '$79.99', bestDeal: true, description: t('lifetimeAccessOneTimePayment') },
  ];

  if (!isOpen) return null;

  return (
    <>
      <style>{popupAnimation}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-xs mx-4">
          <OptimizedGlass
            variant="default"
            className="duration-modal-popup px-6 pt-6 pb-4 shadow-xl rounded-3xl"
          >
            <div className="mb-4 w-full">
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src="/lovable-uploads/Product-external.png"
                  alt="External Product"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{t('chooseDuration')}</h2>
              <button
                onClick={onClose}
                className="text-white/60 transition-colors hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-2">
              {options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => window.open(stripeLinks[o.id], '_blank')}
                  className={`relative flex w-full items-center justify-between rounded-xl
                              bg-white/10 px-4 py-3 text-base font-semibold text-white
                              transition hover:bg-white/20
                              ${o.bestDeal ? "border-2 border-green-400" : ""}
                              ${o.mostPopular ? "border-2 border-yellow-400" : ""}`}
                >
                  <span className="flex flex-col items-start text-left">
                    <span>{o.name}</span>
                    <span className="mt-1 text-xs font-normal text-white/50">
                      {o.description}
                    </span>
                    {o.id === 'lifetime' && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90 ring-1 ring-white/15">
                        <svg className="h-3.5 w-3.5 text-white/90" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span>{t('lifetime_unlockall_free_badge')}</span>
                      </span>
                    )}
                  </span>
                  <span className="ml-2 flex flex-col items-end">
                    {o.oldPrice && (
                      <span className="text-xs text-white/40 line-through">
                        {o.oldPrice}
                      </span>
                    )}
                    <span className="font-bold">{plans[o.id]?.usd || o.price}</span>
                  </span>
                  {o.bestDeal && (
                    <span className="absolute -top-2 right-2 rounded-full bg-green-400 px-2 py-0.5 text-xs font-bold text-black shadow flex items-center">
                      <img src="/lovable-uploads/Dollarlogo.png" alt="Dollar Logo" className="h-4 w-4 mr-1" />
                      <span>{t('best_deal')}</span>
                    </span>
                  )}
                  {o.mostPopular && (
                    <span className="absolute -top-2 right-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-black shadow flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 16L3 6L8.5 10L12 4L15.5 10L21 6L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
                      </svg>
                      <span>{t('most_popular')}</span>
                    </span>
                  )}
                </button>
              ))}
            </div>

            <footer className="mt-8 text-center text-sm text-white/60">
              Powered by <span className="font-bold italic text-white">Stripe</span>
              <div className="mt-1 text-xs text-white/40">Powering Global Payments</div>
            </footer>
          </OptimizedGlass>
        </div>
      </div>
    </>
  );
};

export default DurationModal; 