import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const options: DurationOption[] = [
  { id: '2h', name: '2 HOURS LICENSE', price: '€2.95', description: 'Best for testing' },
  { id: '1week', name: '1 WEEK LICENSE', price: '€10.95', description: 'Ideal for extensive testing' },
  { id: '1month', name: '1 MONTH LICENSE', price: '€29.95', mostPopular: true, description: 'Perfect for long-term needs' },
  { id: 'lifetime', name: 'LIFETIME LICENSE', price: '€79.95', oldPrice: '€119.95', bestDeal: true, description: 'Unlimited access, one-time payment' },
];

const DurationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
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
          <div
            className="duration-modal-popup glass-card border border-white/20 px-6 pt-6 pb-4 rounded-3xl shadow-xl"
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
              <h2 className="text-xl font-bold text-white">Choose Duration</h2>
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
                  onClick={() => navigate(`/checkout?plan=${o.id}`)}
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
                  </span>
                  <span className="ml-2 flex flex-col items-end">
                    {o.oldPrice && (
                      <span className="text-xs text-white/40 line-through">
                        {o.oldPrice}
                      </span>
                    )}
                    <span className="font-bold">{o.price}</span>
                  </span>
                  {o.bestDeal && (
                    <span className="absolute -top-2 right-2 rounded-full bg-green-400 px-2 py-0.5 text-xs font-bold text-black shadow flex items-center">
                      <img src="/lovable-uploads/Dollarlogo.png" alt="Dollar Logo" className="h-4 w-4 mr-1" />
                      <span>Best Deal</span>
                    </span>
                  )}
                  {o.mostPopular && (
                    <span className="absolute -top-2 right-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-black shadow flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.166 6.5l2.97 6.14a1 1 0 00.9.56h7.928a1 1 0 00.9-.56l2.97-6.14a.5.5 0 00-.8-.56l-3.13 2.61a1 1 0 01-1.32 0l-2.13-1.78a1 1 0 00-1.32 0l-2.13 1.78a1 1 0 01-1.32 0l-3.13-2.61a.5.5 0 00-.8.56zM16 16a1 1 0 01-1 1H5a1 1 0 01-1-1v-1h12v1z" />
                      </svg>
                      <span>Most popular</span>
                    </span>
                  )}
                </button>
              ))}
            </div>

            <footer className="mt-8 text-center text-sm text-white/60">
              Powered by <span className="font-bold italic text-white">SellAuth</span>
              <div className="mt-1 text-xs text-white/40">Safe, Simple, Sold</div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default DurationModal; 