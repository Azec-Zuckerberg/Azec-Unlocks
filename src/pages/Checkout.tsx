import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Copy, ExternalLink, ArrowLeft, Check, X as XIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const steps = [
  { label: "Order Information" },
  { label: "Confirm & Pay" },
  { label: "Receive Your Items" },
];

// Plan definitions (match DurationModal)
const plans = {
  "2h":     { id: "2h", name: "2 HOURS LICENSE",  price: "€2.95",  usd: "$3.47",  description: "Best for testing" },
  "1week":  { id: "1week", name: "1 WEEK LICENSE",   price: "€10.95", usd: "$12.90", description: "Ideal for ongoing projects" },
  "1month": { id: "1month", name: "1 MONTH LICENSE",  price: "€29.95", usd: "$35.26", description: "Perfect for long-term needs" },
  "lifetime": { id: "lifetime", name: "LIFETIME LICENSE", price: "€79.95", oldPrice: "€119.95", usd: "$94.00", oldUsd: "$141.00", description: "Unlimited access, one-time payment" },
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
  
  // Get step from URL, default to 0
  const currentStep = parseInt(searchParams.get("step") || "0");
  
  // Form state
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [agree, setAgree] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [couponValid, setCouponValid] = useState<null | boolean>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Get plan from URL
  const planId = searchParams.get("plan") || "1month";
  const plan = plans[planId] || plans["1month"];

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
    const nextStep = currentStep + 1;
    setSearchParams({ plan: planId, step: nextStep.toString() });
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
          </div>
          <div className="text-base text-white/60 mb-1">Pay AzecUnlocks</div>
          <div className="text-4xl font-extrabold text-white mb-7">{displayPrice}</div>
          <div className="flex items-center gap-4 mb-5">
            <img
              src="/lovable-uploads/Product-external.png"
              alt="External Chair"
              className="h-14 w-14 rounded object-cover border border-[#232323]"
            />
            <div className="flex-1">
              <div className="font-semibold text-white leading-tight text-lg">External Chair</div>
              <div className="text-xs text-white/60 leading-tight">{plan.name}</div>
              <div className="text-xs text-white/30 leading-tight">1x</div>
            </div>
            <span className="font-bold text-white text-lg">{displayPrice}</span>
          </div>
          <hr className="my-5 border-[#232323]" />
          <div className="flex justify-between text-white/80 text-base mb-1">
            <span>Subtotal</span>
            <span>{displayPrice}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-white">
            <span>Total</span>
            <span>{displayPrice}</span>
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
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#232323] bg-[#181818] px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  placeholder="The order confirmation will be sent to this email address"
                />
              </div>
              {/* Coupon */}
              <div>
                <label htmlFor="coupon" className="block text-base font-semibold text-white mb-1">
                  Coupon Code
                </label>
                <div className="flex items-center gap-2 bg-[#181818] border border-[#232323] rounded-lg px-2 py-1 w-full">
                  <input
                    id="coupon"
                    type="text"
                    value={coupon}
                    onChange={e => { setCoupon(e.target.value); setCouponValid(null); }}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 px-2 py-3 text-base"
                    placeholder="Have a coupon code? Enter it here"
                  />
                  <Button type="button" onClick={validateCoupon} className="bg-[#6c7cff] hover:bg-[#5a6be6] text-white font-semibold rounded-xl shadow-none px-4 py-2" disabled={couponLoading}>
                    {couponLoading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : "Validate"}
                  </Button>
                  {couponValid === true && <Check className="text-[#6c7cff] w-6 h-6 ml-2" />}
                  {couponValid === false && <XIcon className="text-[#6c7cff] w-6 h-6 ml-2" />}
                </div>
                {couponValid === false && (
                  <div className="text-xs text-red-500 mt-1 ml-1">Enter a valid discount code</div>
                )}
              </div>
              {/* Payment Method */}
              <div>
                <label className="block text-base font-semibold text-white mb-1">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center rounded-lg border border-[#232323] bg-[#181818] px-4 py-3 text-white">
                  <span className="flex-1 text-base">PayPal Friends & Family</span>
                  <svg className="w-6 h-6 text-blue-400 ml-2" viewBox="0 0 32 32" fill="currentColor"><path d="M29.1 8.6c-.3-2.2-2.2-3.6-4.7-3.6h-8.2c-.7 0-1.3.5-1.4 1.2l-4.2 21.1c-.1.4.2.7.6.7h4.2c.3 0 .6-.2.7-.5l1.2-6.1c.1-.3.3-.5.7-.5h2.2c4.6 0 8.2-1.9 9.2-7.3.3-1.7.2-3.1-.3-4.3zm-3.2 4.2c-.7 3.7-3.3 4.1-6.4 4.1h-1.1c-.4 0-.7.3-.8.7l-1.2 6.1c0 .1-.1.1-.2.1h-2.1c-.1 0-.2-.1-.1-.2l3.7-18.7c0-.1.1-.1.2-.1h6.7c1.2 0 2.1.3 2.7.8.6.5.9 1.3.7 2.2z"/></svg>
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
                  I have read and agree to the <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">AzecUnlocks Terms of Service</Link>.
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
                  I would like to receive updates and promotions from AzecUnlocks
                </label>
              </div>
              {/* Proceed Button */}
              <Button type="submit" className="w-full bg-[#6c7cff] hover:bg-[#5a6be6] text-white font-semibold py-3 mt-2 text-lg rounded-xl flex items-center justify-center gap-2 shadow-none">
                Proceed to Payment <span className="ml-1">→</span>
              </Button>
            </form>
          )}
          {/* Step 2: Payment Instructions */}
          {currentStep === 1 && (
            <div>
              {/* Payment Method Card */}
              <div className="mb-8 border border-[#232323] rounded-lg bg-[#181818] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-7 w-7" />
                  <span className="font-semibold text-white text-base">PayPal Friends & Family</span>
                  <span className="ml-auto text-xs text-white/40 font-mono">{invoiceId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                  <div>Invoice ID</div>
                  <div className="text-right flex items-center gap-2 justify-end">
                    <span>{invoiceId}</span>
                    <button type="button" onClick={() => handleCopy(invoiceId, "Invoice ID")}>{copied === "Invoice ID" ? "Copied" : <Copy className="w-4 h-4 text-blue-400" />}</button>
                  </div>
                  <div>Email</div>
                  <div className="text-right">{email}</div>
                  <div>Total Price</div>
                  <div className="text-right">
                    {planId === "lifetime" ? (
                      <>
                        <span className="line-through text-white/40 mr-2">{plan.oldPrice}</span>
                        <span className="text-white font-bold">{displayPrice}</span>
                      </>
                    ) : (
                      <span>{displayPrice}</span>
                    )}
                  </div>
                  <div>Total Price (USD)</div>
                  <div className="text-right">
                    {planId === "lifetime" ? (
                      <>
                        <span className="line-through text-white/40 mr-2">{plan.oldUsd}</span>
                        <span className="text-white font-bold">{displayUsd}</span>
                      </>
                    ) : (
                      <span>{displayUsd}</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Payment Steps */}
              <ol className="flex flex-col gap-8 mb-8">
                {/* 1 */}
                <li className="relative pl-10">
                  <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#5B64C2] text-base font-bold text-white">1</span>
                  <div className="font-bold text-[#5B64C2] text-base mb-1">You should send a friends or family payment to the following account</div>
                  <div className="text-white/80 text-xs mb-2">If you do not send as friends or family, your order might not be processed and you might not be eligible for a refund</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Button type="button" className="bg-[#5B64C2] hover:bg-[#4a53a6] text-white font-semibold px-4 py-2 rounded-md text-xs" onClick={() => handleCopy(paypalEmail, "PayPal Email")}>{paypalEmail} {copied === "PayPal Email" && <span className="ml-1">Copied</span>}</Button>
                    <a href="https://paypal.me/AZECUNLOCKS" target="_blank" rel="noopener noreferrer" className="text-blue-400 flex items-center gap-1 text-xs font-semibold hover:underline px-4 py-2 border border-[#5B64C2] rounded-md">
                      Open PayPal <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </li>
                {/* 2 */}
                <li className="relative pl-10">
                  <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#5B64C2] text-base font-bold text-white">2</span>
                  <div className="font-bold text-[#5B64C2] text-base mb-1">Make sure to send the exact amount</div>
                  <div className="text-white/80 text-xs mb-2">You can copy it below</div>
                  <Button type="button" className="bg-[#5B64C2] hover:bg-[#4a53a6] text-white font-semibold px-4 py-2 rounded-md text-xs" onClick={() => handleCopy(displayPrice, "Amount")}>{displayPrice} {copied === "Amount" && <span className="ml-1">Copied</span>}</Button>
                </li>
              </ol>
              {/* I did everything button */}
              <Button
                type="button"
                className="w-full bg-[#6c7cff] hover:bg-[#5a6be6] text-white font-semibold py-3 text-lg rounded-xl flex items-center justify-center gap-2 shadow-none mt-2"
                onClick={handleNextStep}
              >
                I did everything
              </Button>
            </div>
          )}
          {/* Step 3: Contact Instructions */}
          {currentStep === 2 && (
            <div className="flex flex-col items-center justify-center gap-8 py-8">
              <div className="w-full max-w-lg bg-[#181818] border border-[#232323] rounded-2xl px-8 py-10 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Final Step: Contact Us</h2>
                <p className="text-white/80 text-base mb-6">
                  To receive your product, please send us a message on <span className="font-semibold text-[#5B64C2]">Discord</span> or email us at <span className="font-semibold text-blue-400">azecUnlocks@gmail.com</span>.<br />
                  <br />
                  <span className="text-white">Include the following in your message:</span>
                </p>
                <ul className="text-white/90 text-base mb-6 text-left mx-auto max-w-md">
                  <li className="mb-2">• <span className="font-semibold">Your Email Address:</span> <span className="bg-[#232323] px-2 py-1 rounded text-blue-400 select-all">{email}</span></li>
                  <li className="mb-2">• <span className="font-semibold">A screenshot of your payment</span></li>
                </ul>
                <div className="text-white/70 text-sm mb-4">Discord: <span className="font-semibold text-blue-400">azec</span></div>
                <div className="text-white/70 text-sm">Email: <span className="font-semibold text-blue-400">azecUnlocks@gmail.com</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer under left card */}
      <div className="w-full flex justify-center mt-8">
        <div className="text-xs text-white/60">
          Powered by <span className="font-bold text-white">sell</span><span className="font-bold" style={{ color: '#5B64C2' }}>auth</span> <span className="mx-1">•</span>
          <Link to="/terms" target="_blank" rel="noopener noreferrer" className="underline text-white/60 hover:text-white">Terms of Service</Link>
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
          Back
        </Button>
      )}
    </div>
  );
};

export default CheckoutPage; 