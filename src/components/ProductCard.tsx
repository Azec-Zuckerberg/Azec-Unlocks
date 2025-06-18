
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  status: "Undetected" | "In Update";
  type?: string;
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
      className="glass-card glass-card-hover p-6 group cursor-pointer relative" 
      onClick={handlePurchase}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
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
        <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-white/90 transition-colors">{product.name}</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm font-medium">Starts at</p>
            <p className="text-white font-bold text-2xl">€{product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export type { Product };
