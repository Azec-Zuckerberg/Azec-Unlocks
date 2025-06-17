
import { Product } from "./ProductCard";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onPurchase: (product: Product) => void;
}

const ProductGrid = ({ products, onPurchase }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
