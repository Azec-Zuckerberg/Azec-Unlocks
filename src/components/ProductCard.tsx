import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ShieldCheck } from "lucide-react";
import OptimizedGlass from './OptimizedGlass';

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
  const statusClass = product.status === "Undetected" ? "status-undetected" : "status-update";
  
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
      </div>
    </OptimizedGlass>
  );
};

export default ProductCard;
