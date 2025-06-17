import { useState } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import SparklingBackground from "@/components/SparklingBackground";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Call of Duty", "Spoofer", "Accounts", "Fortnite", "DMA"];

  const products: Product[] = [
    {
      id: "1",
      name: "Permanent HWID Spoofer - Manual",
      price: 39.99,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "Spoofer",
      status: "Undetected",
      type: "Manual"
    },
    {
      id: "2",
      name: "DMA 75T Bundle",
      price: 339.99,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "DMA",
      status: "Undetected"
    },
    {
      id: "3",
      name: "Permanent HWID Spoofer - Automated",
      price: 19.99,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "Spoofer",
      status: "Undetected",
      type: "Automated"
    },
    {
      id: "4",
      name: "Xbox Gamepass",
      price: 2.49,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "Accounts",
      status: "Undetected"
    },
    {
      id: "5",
      name: "COD MW3 Unlock All",
      price: 24.99,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "Call of Duty",
      status: "In Update"
    },
    {
      id: "6",
      name: "Fortnite Account Bundle",
      price: 15.99,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "Fortnite",
      status: "Undetected"
    },
    {
      id: "7",
      name: "Advanced DMA Tool",
      price: 199.99,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "DMA",
      status: "Undetected"
    },
    {
      id: "8",
      name: "Premium COD Spoofer",
      price: 49.99,
      image: "/lovable-uploads/a0ae471d-7549-4960-8bae-84f65651eeae.png",
      category: "Call of Duty",
      status: "Undetected"
    }
  ];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handlePurchase = (product: Product) => {
    toast({
      title: "Redirecting to checkout",
      description: `Processing payment for ${product.name}...`,
    });
    console.log("Processing direct checkout for product:", product);
  };

  return (
    <div className="min-h-screen bg-gaming-bg relative">
      <SparklingBackground />
      <Header />
      
      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Store Title */}
        <div className="text-center mb-16">
          <p className="text-gaming-red text-sm font-semibold mb-4 tracking-widest uppercase">STORE</p>
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight">Our Products</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Discover premium digital tools and services designed for the modern user</p>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Product Grid */}
        <ProductGrid 
          products={filteredProducts}
          onPurchase={handlePurchase}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
