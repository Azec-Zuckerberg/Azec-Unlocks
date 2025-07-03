import React from 'react';

interface DurationOption {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  bestDeal?: boolean;
  description: string;
  checkoutUrl: string;
}

interface DurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDuration: (option: DurationOption) => void;
}

// Popup animation styles
const popupAnimation = `
@keyframes popup {
  0% { opacity: 0; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1); }
}
.duration-modal-popup {
  animation: popup 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
`;

const DurationModal: React.FC<DurationModalProps> = ({ isOpen, onClose, onSelectDuration }) => {
  const durationOptions: DurationOption[] = [
    { id: '2h', name: '2 HOURS LICENSE', price: '€2.95', description: 'Best for testing', checkoutUrl: 'https://azec-unlocks.mysellauth.com/checkout/ec67b12803efa-0000005281079' },
    { id: '1day', name: '1 DAY LICENSE', price: '€11.95', description: 'Best for extensive testing', checkoutUrl: 'https://azec-unlocks.mysellauth.com/checkout/c699d563e5211-0000005281082' },
    { id: '1week', name: '1 WEEK LICENSE', price: '€23.95', description: 'Ideal for short term use', checkoutUrl: 'https://azec-unlocks.mysellauth.com/checkout/efbdeb4c3e769-0000005281086' },
    { id: '1month', name: '1 MONTH LICENSE', price: '€29.95', oldPrice: '€42.95', bestDeal: true, description: 'Best for Competitive Play', checkoutUrl: 'https://azec-unlocks.mysellauth.com/checkout/8a621c863d8ed-0000005281088' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <style>{popupAnimation}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60"
          onClick={onClose}
        />
        {/* Modal */}
        <div className="relative w-full max-w-xs mx-4">
          <div className="glass-card border border-white/20 pt-6 pb-4 px-6 rounded-3xl duration-modal-popup">
            {/* Product Image */}
            <div className="w-full mb-4">
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src="/lovable-uploads/Product-external.png"
                  alt="External Product"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Choose Duration</h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Duration Options */}
            <div className="space-y-2">
              {durationOptions.map((option) => (
                <button
                  key={option.id}
                  className={`w-full py-3 px-4 rounded-xl bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-all flex items-center justify-between relative ${option.bestDeal ? 'border-2 border-green-400' : ''}`}
                  onClick={() => onSelectDuration(option)}
                >
                  <span className="flex flex-col items-start">
                    <span>{option.name}</span>
                    <span className="text-xs text-white/50 font-normal mt-1">{option.description}</span>
                  </span>
                  <span className="ml-2 flex flex-col items-end">
                    {option.oldPrice && (
                      <span className="text-xs text-white/40 line-through">{option.oldPrice}</span>
                    )}
                    <span className="font-bold">{option.price}</span>
                  </span>
                  {option.bestDeal && (
                    <span className="absolute -top-2 right-2 bg-green-400 text-xs text-black font-bold px-2 py-0.5 rounded-full shadow">Best Deal</span>
                  )}
                </button>
              ))}
            </div>
            {/* Modal Footer */}
            <div className="mt-8 text-center text-white/60 text-sm">
              Powered by <span className="font-bold italic text-white">SellAuth</span>
              <div className="text-xs text-white/40 mt-1">Safe, Simple, Sold</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DurationModal; 