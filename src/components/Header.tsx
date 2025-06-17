
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 logo-glow flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-semibold text-xl tracking-tight">Spyder Store</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link">Store</a>
              <a href="#" className="nav-link">FAQ</a>
              <a href="#" className="nav-link">Contact</a>
              <a href="#" className="nav-link">Guides</a>
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button className="glass-button hidden md:inline-flex">
              UNBAN MY PC
            </Button>
            
            <button className="p-3 glass-card-hover rounded-xl transition-all duration-300">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
