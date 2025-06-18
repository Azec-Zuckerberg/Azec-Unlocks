import { useState } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import GridBackground from "../components/GridBackground";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All");

  /* ----------  catalogue  ---------- */
  const products: Product[] = [
    {
      id: "1",
      name: "Unlock All",
      price: 20.0,
      image: "/lovable-uploads/Product-Unlockall.png",
      category: "Spoofer",
      status: "Undetected",
    },
    {
      id: "2",
      name: "External Chair",
      price: 4.99,
      image: "/lovable-uploads/Product-external.png",
      category: "DMA",
      status: "Undetected",
    },
    {
      id: "3",
      name: "Internal Chair",
      price: 4.99,
      image: "/lovable-uploads/Product-internal.png",
      category: "Spoofer",
      status: "Undetected",
    },
  ];

  const categories = ["All", "Warzone"];

  const shown =
    activeCategory === "All"
      ? products.slice(0, 3)
      : products.filter((p) => p.category === activeCategory).slice(0, 3);

  const handlePurchase = (product: Product) => {
    toast({
      title: "Redirecting to checkout",
      description: `Processing payment for ${product.name}…`,
    });
    console.log("Processing direct checkout for product:", product);
  };

  /* ----------  render  ---------- */
  return (
    <div className="min-h-screen bg-gaming-bg relative">
      <GridBackground />
      <Header />

      <main className="container mx-auto px-6 py-12 relative z-10 pt-32">
        {/* Store Title */}
        <div className="text-center mb-16">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Our Products
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover premium digital tools and services designed for the modern
            user
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={shown} onPurchase={handlePurchase} />

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
