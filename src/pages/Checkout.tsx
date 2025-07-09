import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Copy, ExternalLink, ArrowLeft, Check, X as XIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from 'react-i18next';

const steps = [
  { label: "Order Information" },
  { label: "Confirm & Pay" },
  { label: "Receive Your Items" },
];

// Plan definitions (match DurationModal)
const plans = {
  "2h":     { id: "2h", name: "2 HOURS LICENSE",  price: "€2.95",  usd: "$3.47",  description: "Best for testing" },
  "1week":  { id: "1week", name: "1 WEEK LICENSE",   price: "€10.95", usd: "$12.90", description: "Ideal for ongoing projects" },
  "lifetime": { id: "lifetime", name: "LIFETIME LICENSE", price: "€29.95", usd: "$33.95", description: "Unlimited access, one-time payment" },
};

// Stripe links for each product/plan
const stripeLinks: Record<string, string> = {
  "2h": "https://buy.stripe.com/28EfZhgho28y3vPftn6AM03",
  "1week": "https://buy.stripe.com/5kQ6oHfdkfZo5DX6WR6AM02",
  "lifetime": "https://buy.stripe.com/8x2dR91muaF40jD2GB6AM00",
  "unlockall": "https://buy.stripe.com/7sY14n9T06oO5DXdlf6AM04",
};

// Generate a random English word from a dictionary list
const ENGLISH_WORDS = [
  "apple", "river", "forest", "mountain", "cloud", "dream", "light", "shadow", "ocean", "star", "planet", "energy", "music", "flower", "garden", "island", "mirror", "crystal", "ember", "pulse", "echo", "breeze", "flame", "frost", "wave", "stone", "sky", "storm", "sun", "moon", "wind", "rain", "leaf", "root", "seed", "petal", "branch", "field", "meadow", "valley", "hill", "path", "trail", "road", "bridge", "gate", "tower", "castle", "cave", "lake", "pond", "brook", "stream", "spring", "autumn", "winter", "summer", "harvest", "dawn", "dusk", "twilight", "night", "day", "hour", "minute", "second", "spark", "flare", "prism", "ripple", "zenith", "nova", "orbit", "vortex", "bliss", "pride", "honor", "peace", "hope", "joy", "grace", "faith", "truth", "wisdom", "valor", "spirit", "quest", "vision", "focus", "logic", "sense", "dreamer", "hero", "guide", "sage", "seer", "ranger", "scout", "pilot", "rider", "keeper", "maker", "smith", "weaver", "scribe"
];
function generateRandomKeyword() {
  return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
}

function generateRandomInvoiceId() {
  // Example: 16 hex chars + '-' + 12 digits
  const hex = Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join("");
  const digits = Array.from({length: 12}, () => Math.floor(Math.random()*10)).join("");
  return `${hex}-${digits}`;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  
  // For unlockall, always start at step 0 if no step param is present
  const stepParam = searchParams.get("step");
  const currentStep = stepParam ? parseInt(stepParam) : 0;
  
  // Form state
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [agree, setAgree] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [couponValid, setCouponValid] = useState<null | boolean>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [proceedingToPayment, setProceedingToPayment] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>("paypal");

  // Get plan from URL
  const planId = searchParams.get("plan") || "lifetime";
  const plan = plans[planId] || plans["lifetime"];

  // Detect if this is the Unlock All checkout
  const isUnlockAll = searchParams.get("product") === "unlockall";
  const unlockAllProduct = {
    name: "Unlock All Lifetime",
    image: "/lovable-uploads/Product-Unlockall.png",
    description: "Unlock all camos, attachments, operators, and more in seconds. Safe, fast, and undetected. Works for all accounts and is backed by our premium support.",
    price: "€29.95",
    usd: "$33.95",
  };

  // Random invoice ID (only generated once per checkout)
  const [invoiceId, setInvoiceId] = useState("");
  useEffect(() => {
    setInvoiceId(generateRandomInvoiceId());
  }, []);

  // Payment info (static for demo)
  const paypalEmail = "azecunlocks@gmail.com";
  let displayPrice = plan.price;
  let displayUsd = plan.usd;

  // Copy to clipboard
  const [copied, setCopied] = useState("");
  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied("") , 1500);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch {}
  };

  const handleNextStep = () => {
    if (currentStep === 0) {
      if (paymentMethod === 'stripe') {
        // Redirect to Stripe checkout immediately
        const stripeUrl = isUnlockAll ? stripeLinks["unlockall"] : stripeLinks[planId];
        window.open(stripeUrl, '_blank');
        return;
      }
      setProceedingToPayment(true);
      setTimeout(() => {
        const nextStep = currentStep + 1;
        setSearchParams({ plan: planId, step: nextStep.toString() });
        setProceedingToPayment(false);
      }, 2000);
    } else if (currentStep === 1) {
      // Show loading state for payment check
      setCheckingPayment(true);
      setTimeout(() => {
        // Proceed to step 3 (always with error state)
        const nextStep = currentStep + 1;
        setSearchParams({ plan: planId, step: nextStep.toString() });
        setCheckingPayment(false);
      }, 2000);
    } else {
      const nextStep = currentStep + 1;
      setSearchParams({ plan: planId, step: nextStep.toString() });
    }
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setSearchParams({ plan: planId, step: prevStep.toString() });
    } else {
      // If we're at step 0, go back to store
      navigate(-1);
    }
  };

  const validateCoupon = () => {
    setCouponLoading(true);
    setCouponValid(null);
    setTimeout(() => {
      if (coupon.trim().toUpperCase() === "SUMMER5" && planId === "1month") {
        setCouponValid(true);
      } else {
        setCouponValid(false);
      }
      setCouponLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#111] px-2 py-8">
      <div className="flex items-start justify-center w-full">
        {/* Left: Order Summary */}
        <div className="w-full max-w-md rounded-2xl bg-[#181818] px-8 py-8 shadow border border-[#232323] mr-10 flex-shrink-0" style={{ minWidth: 380 }}>
          <div className="flex items-center gap-3 mb-7">
            <img
              src="/lovable-uploads/AzecLogoNoBG.png"
              alt="AzecUnlocks Logo"
              className="h-9 w-9 rounded-full object-cover bg-black"
            />
            <span className="font-semibold text-white text-xl">AzecUnlocks</span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`w-8 h-8 rounded-full border-2 transition-all overflow-hidden ${
                  i18n.language === 'en' 
                    ? 'border-blue-400 scale-110' 
                    : 'border-gray-400 hover:border-gray-300'
                }`}
                title="English"
              >
                <img 
                  src="/lovable-uploads/ukflag.png" 
                  alt="UK Flag" 
                  className="w-full h-full object-cover object-center"
                />
              </button>
              <button
                onClick={() => i18n.changeLanguage('fr')}
                className={`w-8 h-8 rounded-full border-2 transition-all overflow-hidden ${
                  i18n.language === 'fr' 
                    ? 'border-blue-400 scale-110' 
                    : 'border-gray-400 hover:border-gray-300'
                }`}
                title="Français"
              >
                <img 
                  src="/lovable-uploads/franceflag.png" 
                  alt="French Flag" 
                  className="w-full h-full object-cover object-center"
                />
              </button>
            </div>
          </div>
          <div className="text-base text-white/60 mb-1">{isUnlockAll ? unlockAllProduct.name : t('payAzecUnlocks')}</div>
          <div className="text-4xl font-extrabold text-white mb-7">{isUnlockAll ? unlockAllProduct.price : displayPrice}</div>
          <div className="flex items-center gap-4 mb-5">
            <img
              src={isUnlockAll ? unlockAllProduct.image : "/lovable-uploads/Product-external.png"}
              alt={isUnlockAll ? unlockAllProduct.name : t('externalChair')}
              className="h-14 w-14 rounded object-cover border border-[#232323]"
            />
            <div className="flex-1">
              <div className="font-semibold text-white leading-tight text-lg">{isUnlockAll ? unlockAllProduct.name : t('externalChair')}</div>
              <div className="text-xs text-white/60 leading-tight">{isUnlockAll ? unlockAllProduct.description : plan.name}</div>
              <div className="text-xs text-white/30 leading-tight">1x</div>
            </div>
            <span className="font-bold text-white text-lg">{isUnlockAll ? unlockAllProduct.price : displayPrice}</span>
          </div>
          <hr className="my-5 border-[#232323]" />
          <div className="flex justify-between text-white/80 text-base mb-1">
            <span>{t('subtotal')}</span>
            <span>{isUnlockAll ? unlockAllProduct.price : displayPrice}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-white">
            <span>{t('total')}</span>
            <span>{isUnlockAll ? unlockAllProduct.price : displayPrice}</span>
          </div>
        </div>
        {/* Right: Step Content */}
        <div className="w-full max-w-xl rounded-2xl bg-[#181818] px-10 py-10 shadow border border-[#232323] flex flex-col gap-7" style={{ minWidth: 480 }}>
          {/* Step Indicator */}
          <div className="flex mb-8 border-b border-[#232323]">
            {steps.map((s, i) => (
              <div key={s.label} className={`flex-1 pb-3 text-center ${i === currentStep ? "border-b-2 border-blue-500" : ""}`}>
                <span className={`text-base font-semibold ${i === currentStep ? "text-blue-400" : i < currentStep ? "text-white" : "text-white/40"}`}>{`Step ${i + 1}`}</span>
                <div className={`mt-1 text-lg font-bold ${i === currentStep ? "text-white" : i < currentStep ? "text-white" : "text-white/60"}`}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Step 1: Form */}
          {currentStep === 0 && (
            <form className="flex flex-col gap-7" onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-white mb-1">
                  {t('email')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#232323] bg-[#181818] px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  placeholder={t('theOrderConfirmationWillBeSentToThisEmailAddress')}
                />
              </div>
              {/* Coupon */}
              <div>
                <label htmlFor="coupon" className="block text-base font-semibold text-white mb-1">
                  {t('couponCode')}
                </label>
                <div className="flex items-center gap-2 bg-[#181818] border border-[#232323] rounded-lg px-2 py-1 w-full">
                  <input
                    id="coupon"
                    type="text"
                    value={coupon}
                    onChange={e => { setCoupon(e.target.value); setCouponValid(null); }}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 px-2 py-3 text-base"
                    placeholder={t('haveACouponCodeEnterItHere')}
                  />
                  <Button type="button" onClick={validateCoupon} className="bg-[#6c7cff] hover:bg-[#5a6be6] text-white font-semibold rounded-xl shadow-none px-4 py-2" disabled={couponLoading}>
                    {couponLoading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : t('validate')}
                  </Button>
                  {couponValid === true && <Check className="text-[#6c7cff] w-6 h-6 ml-2" />}
                  {couponValid === false && <XIcon className="text-[#6c7cff] w-6 h-6 ml-2" />}
                </div>
                {couponValid === false && (
                  <div className="text-xs text-red-500 mt-1 ml-1">{t('enterAValidDiscountCode')}</div>
                )}
              </div>
              {/* Payment Method */}
              <div>
                <label className="block text-base font-semibold text-white mb-1">
                  {t('paymentMethod')} <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  <label className={`flex items-center rounded-lg border px-4 py-3 cursor-pointer transition ${paymentMethod === 'stripe' ? 'border-blue-500 bg-[#181a2b]' : 'border-[#232323] bg-[#181818]'}`}
                    onClick={() => setPaymentMethod('stripe')}>
                    <span className="flex-1 text-base font-semibold">Debit & Credit Card / Apple Pay / Google Pay</span>
                  </label>
                  <label className={`flex items-center rounded-lg border px-4 py-3 cursor-pointer transition ${paymentMethod === 'paypal' ? 'border-blue-500 bg-[#181a2b]' : 'border-[#232323] bg-[#181818]'}`}
                    onClick={() => setPaymentMethod('paypal')}>
                    <span className="flex-1 text-base font-semibold">PayPal (Friends & Family)</span>
                    <svg className="w-6 h-6 text-blue-400 ml-2" viewBox="0 0 32 32" fill="currentColor"><path d="M29.1 8.6c-.3-2.2-2.2-3.6-4.7-3.6h-8.2c-.7 0-1.3.5-1.4 1.2l-4.2 21.1c-.1.4.2.7.6.7h4.2c.3 0 .6-.2.7-.5l1.2-6.1c.1-.3.3-.5.7-.5h2.2c4.6 0 8.2-1.9 9.2-7.3.3-1.7.2-3.1-.3-4.3zm-3.2 4.2c-.7 3.7-3.3 4.1-6.4 4.1h-1.1c-.4 0-.7.3-.8.7l-1.2 6.1c0 .1-.1.1-.2.1h-2.1c-.1 0-.2-.1-.1-.2l3.7-18.7c0-.1.1-.1.2-.1h6.7c1.2 0 2.1.3 2.7.8.6.5.9 1.3.7 2.2z"/></svg>
                  </label>
                </div>
              </div>
              {/* Terms Checkbox */}
              <div className="flex items-center gap-2">
                <label className="relative flex items-center cursor-pointer select-none" htmlFor="agree">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={agree}
                    onChange={e => setAgree(e.target.checked)}
                    className="peer appearance-none w-6 h-6 rounded-full border border-[#232323] bg-white transition-all duration-200 shadow-sm checked:bg-[#5B64C2] checked:border-[#5B64C2] focus:ring-2 focus:ring-[#5B64C2] focus:outline-none"
                    required
                  />
                  <span className="pointer-events-none absolute left-0 top-0 flex h-6 w-6 items-center justify-center">
                    <svg
                      className="opacity-0 scale-75 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 9.5L8 12.5L13 7.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>
                <label htmlFor="agree" className="text-sm text-white ml-2 cursor-pointer">
                  {t('iHaveReadAndAgreeToThe')} <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{t('azecUnlocksTermsOfService')}</Link>.
                </label>
              </div>
              {/* Marketing Checkbox */}
              <div className="flex items-center gap-2">
                <label className="relative flex items-center cursor-pointer select-none" htmlFor="marketing">
                  <input
                    id="marketing"
                    type="checkbox"
                    checked={marketing}
                    onChange={e => setMarketing(e.target.checked)}
                    className="peer appearance-none w-6 h-6 rounded-full border border-[#232323] bg-white transition-all duration-200 shadow-sm checked:bg-[#5B64C2] checked:border-[#5B64C2] focus:ring-2 focus:ring-[#5B64C2] focus:outline-none"
                  />
                  <span className="pointer-events-none absolute left-0 top-0 flex h-6 w-6 items-center justify-center">
                    <svg
                      className="opacity-0 scale-75 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 9.5L8 12.5L13 7.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>
                <label htmlFor="marketing" className="text-sm text-white ml-2 cursor-pointer">
                  {t('iWouldLikeToReceiveUpdatesAndPromotionsFromAzecUnlocks')}
                </label>
              </div>
              {/* Proceed Button */}
              <Button type="submit" className="w-full bg-[#6c7cff] hover:bg-[#5a6be6] text-white font-semibold py-3 mt-2 text-lg rounded-xl flex items-center justify-center gap-2 shadow-none" disabled={proceedingToPayment}>
                {proceedingToPayment ? (
                  <>
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                    {t('processing')}...
                  </>
                ) : (
                  <>
                    {t('proceedToPayment')} <span className="ml-1">→</span>
                  </>
                )}
              </Button>
            </form>
          )}
          {/* Step 2: Payment Instructions */}
          {currentStep === 1 && (
            <>
              {paymentMethod === 'stripe' ? (
                <div className="flex flex-col items-center justify-center gap-8 py-8">
                  <div className="w-full max-w-lg bg-[#181818] border border-[#232323] rounded-2xl px-8 py-10 flex flex-col items-center text-center">
                    <img
                      src={isUnlockAll ? unlockAllProduct.image : "/lovable-uploads/Product-external.png"}
                      alt={isUnlockAll ? unlockAllProduct.name : t('externalChair')}
                      className="h-20 w-20 rounded object-cover border border-[#232323] mb-4"
                    />
                    <h2 className="text-2xl font-bold text-white mb-2">{isUnlockAll ? unlockAllProduct.name : t('externalChair')}</h2>
                    <p className="text-white/80 text-base mb-4">{isUnlockAll ? unlockAllProduct.description : plan.name}</p>
                    <div className="text-3xl font-extrabold text-white mb-6">{isUnlockAll ? unlockAllProduct.price : displayPrice}</div>
                    <a href={isUnlockAll ? stripeLinks["unlockall"] : stripeLinks[planId]} target="_blank" rel="noopener noreferrer" className="w-full bg-[#635bff] hover:bg-[#5146d8] text-white font-semibold py-3 text-lg rounded-xl flex items-center justify-center gap-2 shadow-none mt-2 transition">
                      Pay with Card / Apple Pay / Google Pay
                    </a>
                  </div>
                </div>
              ) : (
                /* External Chair (default) step 2 */
                <>
                  <div className="mb-6">
                    <div className="border border-blue-500 rounded-lg bg-[#151626] px-6 py-4 text-blue-400 text-base">
                      {t('keyAndLoaderReady')}
                    </div>
                  </div>
                  {/* Payment Method Card */}
                  <div className="mb-8 border border-[#232323] rounded-lg bg-[#181818] p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-7 w-7" />
                      <span className="font-semibold text-white text-base">{t('payPalFriendsFamily')}</span>
                      <span className="ml-auto text-xs text-white/40 font-mono">{invoiceId}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                      <div>{t('invoiceID')}</div>
                      <div className="text-right flex items-center gap-2 justify-end">
                        <span>{invoiceId}</span>
                        <button type="button" onClick={() => handleCopy(invoiceId, t('invoiceID'))}>{copied === t('invoiceID') ? t('copied') : <Copy className="w-4 h-4 text-blue-400" />}</button>
                      </div>
                      <div>{t('email')}</div>
                      <div className="text-right">{email}</div>
                      <div>{t('totalPrice')}</div>
                      <div className="text-right">
                        <span>{displayPrice}</span>
                      </div>
                      <div>{t('totalPriceUSD')}</div>
                      <div className="text-right">
                        <span>{displayUsd}</span>
                      </div>
                    </div>
                  </div>
                  {/* Payment Steps */}
                  <ol className="flex flex-col gap-8 mb-8">
                    {/* 1 */}
                    <li className="relative pl-10">
                      <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#5B64C2] text-base font-bold text-white">1</span>
                      <div className="font-bold text-[#5B64C2] text-base mb-1">{t('youShouldSendAFriendsOrFamilyPaymentToTheFollowingAccount')}</div>
                      <div className="text-white/80 text-xs mb-2">{t('ifYouDoNotSendAsFriendsOrFamilyYourOrderMightNotBeProcessedAndYouMightNotBeEligibleForARefund')}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <Button type="button" className="bg-[#5B64C2] hover:bg-[#4a53a6] text-white font-semibold px-4 py-2 rounded-md text-xs" onClick={() => handleCopy(paypalEmail, t('payPalEmail'))}>{paypalEmail} {copied === t('payPalEmail') && <span className="ml-1">{t('copied')}</span>}</Button>
                        <a href="https://paypal.me/AZECUNLOCKS" target="_blank" rel="noopener noreferrer" className="text-blue-400 flex items-center gap-1 text-xs font-semibold hover:underline px-4 py-2 border border-[#5B64C2] rounded-md">
                          {t('openPayPal')} <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </li>
                    {/* 2 */}
                    <li className="relative pl-10">
                      <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#5B64C2] text-base font-bold text-white">2</span>
                      <div className="font-bold text-[#5B64C2] text-base mb-1">{t('makeSureToSendTheExactAmount')}</div>
                      <div className="text-white/80 text-xs mb-2">{t('youCanCopyItBelow')}</div>
                      <Button type="button" className="bg-[#5B64C2] hover:bg-[#4a53a6] text-white font-semibold px-4 py-2 rounded-md text-xs" onClick={() => handleCopy(displayPrice, t('amount'))}>{displayPrice} {copied === t('amount') && <span className="ml-1">{t('copied')}</span>}</Button>
                    </li>
                  </ol>
                  {/* I did everything button */}
                  <Button
                    type="button"
                    className="w-full bg-[#6c7cff] hover:bg-[#5a6be6] text-white font-semibold py-3 text-lg rounded-xl flex items-center justify-center gap-2 shadow-none mt-2"
                    onClick={handleNextStep}
                    disabled={checkingPayment}
                  >
                    {checkingPayment ? (
                      <>
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                        {t('checkingPayment')}...
                      </>
                    ) : (
                      t('iDidEverything')
                    )}
                  </Button>
                </>
              )}
            </>
          )}
          {/* Step 3: Contact Instructions */}
          {currentStep === 2 && (
            <div className="flex flex-col items-center justify-center gap-8 py-8">
              <div className="w-full max-w-lg bg-[#181818] border border-[#232323] rounded-2xl px-8 py-10 flex flex-col items-center text-center">
                <div className="mb-6 p-4 border border-red-500 rounded-lg bg-red-500/10">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <XIcon className="w-5 h-5" />
                    <span className="font-semibold">{t('paymentError')}</span>
                  </div>
                  <p className="text-red-300 text-sm mb-3">{t('yourPaymentHasNotBeenReceived')}</p>
                  <p className="text-white/80 text-sm">{t('ifYouDidSendPaymentAndYouThinkItsErrorPlease')}</p>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{isUnlockAll ? unlockAllProduct.name : t('finalStepContactUs')}</h2>
                <p className="text-white/80 text-base mb-6">
                  {t('toReceiveYourProductPleaseSendUsAMessageOn')} <span className="font-semibold text-[#5B64C2]">{t('discord')}</span> {t('orEmailUsAt')} <span className="font-semibold text-blue-400">{t('azecUnlocksEmail')}</span>.<br />
                  <br />
                  <span className="text-white">{t('includeTheFollowingInYourMessage')}:</span>
                </p>
                <ul className="text-white/90 text-base mb-6 text-left mx-auto max-w-md">
                  <li className="mb-2">• <span className="font-semibold">{t('yourEmailAddress')}:</span> <span className="bg-[#232323] px-2 py-1 rounded text-blue-400 select-all">{email}</span></li>
                  <li className="mb-2">• <span className="font-semibold">{t('aScreenshotOfYourPayment')}</span></li>
                </ul>
                <div className="text-white/70 text-sm mb-4">{t('discord')}: <span className="font-semibold text-blue-400">{t('discordHandle')}</span></div>
                <div className="text-white/70 text-sm">{t('email')}: <span className="font-semibold text-blue-400">{t('azecUnlocksEmail')}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer under left card */}
      <div className="w-full flex justify-center mt-8">
        <div className="text-xs text-white/60">
          {t('poweredBy')} <span className="font-bold text-white">{t('sell')}</span><span className="font-bold" style={{ color: '#5B64C2' }}>{t('auth')}</span> <span className="mx-1">•</span>
          <Link to="/terms" target="_blank" rel="noopener noreferrer" className="underline text-white/60 hover:text-white">{t('termsOfService')}</Link>
        </div>
      </div>
      {/* Back Button */}
      {currentStep > 0 && (
        <Button
          type="button"
          className="absolute top-4 left-4 bg-[#6c7cff] hover:bg-[#5a6be6] text-white font-semibold py-2 px-4 rounded-full shadow-none"
          onClick={handleBackStep}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Button>
      )}
    </div>
  );
};

export default CheckoutPage; 