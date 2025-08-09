import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ShieldCheck } from "lucide-react";
import OptimizedGlass from './OptimizedGlass';
import { useTranslation } from 'react-i18next';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  status: "Undetected" | "In Update";
  type?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onPurchase: (product: Product) => void;
}

const ProductCard = ({ product, onPurchase }: ProductCardProps) => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();
  const statusClass = product.status === "Undetected" ? "status-undetected" : "status-update";
  const ratingValue = 4.7;
  const ratingsCount = 43;
  
  const handlePurchase = () => {
    // Track the purchase event
    trackEvent('purchase_click', 'ecommerce', product.name, product.price);
    
    toast({
      title: "Redirecting to checkout",
      description: `Processing payment for ${product.name}...`,
    });
    onPurchase(product);
  };
  
  return (
    <OptimizedGlass
      variant="default"
      hover={true}
      className="p-6 relative min-w-[280px] max-w-[340px] w-full rounded-2xl"
      onClick={handlePurchase}
    >
      <div className="relative mb-6">
        <div className="w-full h-48 rounded-xl overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            style={{ willChange: 'transform' }}
          />
        </div>
        
        <div className="absolute top-3 left-3">
          <span className={statusClass}>
            {product.status === "Undetected" ? "✓ Undetected" : "⚠ In Update"}
          </span>
        </div>
        
        {product.type && (
          <div className="absolute top-3 right-3">
            <span className="status-badge bg-white/10 text-white/80 border-white/20">
              {product.type}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-white/90 transition-colors text-center">{product.name}</h3>
        
        <div className="flex flex-col items-center justify-center">
          <p className="text-white/60 text-sm font-medium">Starts at</p>
          <p className="text-white font-bold text-2xl">€{product.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs">
          <div className="flex items-center gap-0.5 text-red-400">
            {Array.from({ length: 5 }).map((_, idx) => (
              <svg key={idx} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 14.347a1 1 0 00-1.175 0l-2.986 2.136c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.704 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-white font-semibold">{t('rated')} {ratingValue.toFixed(1)}</span>
          <span className="text-white/50">({ratingsCount})</span>
          <span className="ml-1 inline-flex items-center rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-200 border border-red-400/30">
            {t('happy_customers')}
          </span>
        </div>
      </div>
    </OptimizedGlass>
  );
};

export default ProductCard;
