import { useToast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

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
  const statusClass = product.status === "Undetected" ? "status-undetected" : "status-update";
  
  const handlePurchase = () => {
    toast({
      title: "Redirecting to checkout",
      description: `Processing payment for ${product.name}...`,
    });
    onPurchase(product);
  };
  
  return (
    <div 
      className="glass-card glass-card-hover p-6 group cursor-pointer relative min-w-[280px] max-w-[340px] w-full"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.20)',
        borderRadius: '1rem',
      }}
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
    </div>
  );
};

export default ProductCard;
