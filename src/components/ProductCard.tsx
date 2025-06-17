
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const statusClass = product.status === "Undetected" ? "status-undetected" : "status-update";
  
  return (
    <div className="glass-card glass-card-hover p-6 group cursor-pointer">
      <div className="relative mb-6">
        <div className="w-full h-48 bg-white/5 rounded-xl overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
        <h3 className="text-white font-semibold text-lg leading-tight">{product.name}</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm font-medium">Starts at</p>
            <p className="text-white font-bold text-2xl">€{product.price.toFixed(2)}</p>
          </div>
          
          <Button 
            onClick={() => onAddToCart(product)}
            className="glass-button flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export type { Product };
