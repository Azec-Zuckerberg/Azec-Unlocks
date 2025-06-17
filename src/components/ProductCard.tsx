
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
    <div className="gaming-card p-4 group">
      <div className="relative mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-3 left-3">
          <span className={statusClass}>
            {product.status === "Undetected" ? "✓ Undetected" : "⚠ In Update"}
          </span>
        </div>
        {product.type && (
          <div className="absolute top-3 right-3">
            <span className="gaming-badge bg-gray-900/80 text-gray-300 border border-gray-700">
              {product.type}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg leading-tight">{product.name}</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Starts at</p>
            <p className="text-white font-bold text-xl">€{product.price.toFixed(2)}</p>
          </div>
          
          <Button 
            onClick={() => onAddToCart(product)}
            className="gaming-button flex items-center space-x-2"
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
