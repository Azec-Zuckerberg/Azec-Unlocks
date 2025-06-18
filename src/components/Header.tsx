import { User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-3xl mx-auto mt-6 rounded-2xl px-4 py-2 flex items-center justify-center shadow-lg border border-white/20" 
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
      {/* Logo */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/80 border border-white/10 mr-4">
        {/* Replace with your SVG or icon for the spider */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" stroke="#ff1a1a" strokeWidth="2" fill="none" />
          <path d="M12 7v10M7 12h10M9 9l6 6M15 9l-6 6" stroke="#ff1a1a" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <a href="#" className="text-white/90 font-medium hover:text-white transition">Store</a>
        <a href="#" className="text-white/90 font-medium hover:text-white transition">Faq</a>
        <a href="#" className="text-white/90 font-medium hover:text-white transition">Contact</a>
        <a href="#" className="text-white/90 font-medium hover:text-white transition">Guides</a>
      </nav>
      {/* Divider */}
      <div className="mx-4 h-8 w-px bg-white/10" />
      {/* Language Selector */}
      <div className="flex items-center space-x-1 cursor-pointer px-3 py-2 rounded-lg hover:bg-white/5 transition">
        <Globe className="w-5 h-5 text-white" />
        <span className="text-white font-medium text-sm">EN</span>
        <svg className="w-3 h-3 ml-1 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </header>
  );
};

export default Header;
