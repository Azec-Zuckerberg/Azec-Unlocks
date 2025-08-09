import { Product } from "./ProductCard";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onPurchase: (product: Product) => void;
}

const ProductGrid = ({ products, onPurchase }: ProductGridProps) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center p-4 rounded-lg">
            <ProductCard 
              product={product} 
              onPurchase={onPurchase}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
