import { User, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleDropdownToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2
      });
    }
    setOpen((v) => !v);
  };

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-3xl mx-auto mt-4 sm:mt-6">
        <div className="px-4 py-2 rounded-full bg-white/4 border border-white/15 backdrop-blur-md">
          <div className="flex items-center justify-center w-full">
            {/* Logo */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/80 border-2 border-[#810D0A] shadow-[0_0_12px_1.5px_rgba(129,13,10,0.4)] mr-2 md:mr-4 overflow-hidden">
              <img src="/lovable-uploads/AzecLogo.png" alt="Azec Logo" className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain" />
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
              <Link to="/" className="text-white/90 font-medium hover:text-white transition text-xs sm:text-sm md:text-base">{t('store')}</Link>
              <Link to="/reviews" className="text-white/90 font-medium hover:text-white transition text-xs sm:text-sm md:text-base">{t('reviews')}</Link>
              <Link to="/faq" className="text-white/90 font-medium hover:text-white transition text-xs sm:text-sm md:text-base">{t('faq')}</Link>
              <Link to="/contact" className="text-white/90 font-medium hover:text-white transition text-xs sm:text-sm md:text-base">{t('contact')}</Link>
              <Link to="/guides" className="text-white/90 font-medium hover:text-white transition text-xs sm:text-sm md:text-base">{t('guides')}</Link>
            </nav>
            
            {/* Divider */}
            <div className="mx-1 sm:mx-2 md:mx-4 h-6 sm:h-8 w-px bg-white/10" />
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                ref={buttonRef}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-white/5 transition text-white font-medium text-xs sm:text-sm focus:outline-none"
                onClick={handleDropdownToggle}
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                {LANGUAGES.find(l => l.code === i18n.language)?.label || "EN"}
                <svg className="w-2 h-2 sm:w-3 sm:h-3 ml-1 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Portal for dropdown */}
      {open && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed min-w-[64px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg z-[9999] flex flex-col items-center p-1" 
          style={{
            background: 'rgba(255,255,255,0.08)', 
            backdropFilter: 'blur(12px)', 
            WebkitBackdropFilter: 'blur(12px)',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            transform: 'translateX(-50%)'
          }}
        >
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
              className={`flex items-center w-full px-2 py-1 text-left text-white hover:bg-white/10 transition text-sm sm:text-base ${i18n.language === lang.code ? 'font-semibold' : ''}`}
            >
              {lang.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
