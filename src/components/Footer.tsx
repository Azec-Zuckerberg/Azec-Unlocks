import { Shield, Zap, Users, Award } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    "Products", "FAQ", "Contact", "Guides", "Terms of Service"
  ];

  const featuredProducts = [
    "MSInfo32 | Fixer", "COD - Cleaner", "Tweaks & Optimization", 
    "Fortnite Accounts", "Spoofer Manual", "Spoofer Auto"
  ];

  const paymentMethods = [
    { name: "Mastercard", color: "bg-red-500" },
    { name: "Visa", color: "bg-blue-500" },
    { name: "PayPal", color: "bg-blue-600" },
    { name: "Crypto", color: "bg-amber-500" }
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10">
      {/* Decorative glow line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gaming-red to-transparent"></div>
      
      <div className="glass-card border-0 rounded-none">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 logo-glow flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-white font-bold text-2xl tracking-tight">spyderrz</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                At Spyderrz, we are dedicated to helping gamers overcome hardware 
                bans with professional, secure and efficient solutions.
              </p>
              
              {/* Payment Methods */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-4 items-center justify-start">
                  <img src="/payment-methods/visa.png" alt="Visa" className="h-8 w-auto" />
                  <img src="/payment-methods/mastercard.png" alt="Mastercard" className="h-8 w-auto" />
                  <img src="/payment-methods/paypal.png" alt="PayPal" className="h-8 w-auto" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-lg">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2 group">
                    <div className="w-1 h-1 bg-gaming-red rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-lg">Featured Products</h3>
              <div className="space-y-3">
                {featuredProducts.map((product, index) => (
                  <div key={index} className="flex items-center space-x-2 group">
                    <div className="w-1 h-1 bg-gaming-red rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                      {product}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-lg">Why Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="glass-card-hover p-2 rounded-lg">
                    <Shield className="w-4 h-4 text-gaming-red" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Secure & Safe</p>
                    <p className="text-white/60 text-xs">Industry-leading security</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 group">
                  <div className="glass-card-hover p-2 rounded-lg">
                    <Zap className="w-4 h-4 text-gaming-red" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Fast Delivery</p>
                    <p className="text-white/60 text-xs">Instant digital delivery</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group">
                  <div className="glass-card-hover p-2 rounded-lg">
                    <Award className="w-4 h-4 text-gaming-red" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Quality Assured</p>
                    <p className="text-white/60 text-xs">Premium products only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © 2025 <span className="text-white font-medium">spyderrz</span>. All rights reserved.
              </div>
              <div className="text-white/50 text-xs">
                All trademarks referenced herein are the properties of their respective owners.
              </div>
              
              {/* Discord/Social Icons */}
              <div className="flex items-center space-x-4">
                <div className="glass-card-hover p-3 rounded-xl">
                  <Users className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
                </div>
                <div className="text-white/60 text-sm">
                  Activate Windows
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
