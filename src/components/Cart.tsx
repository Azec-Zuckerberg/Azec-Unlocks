
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "./ProductCard";

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md glass-card border-l border-white/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-gaming-red" />
              <h2 className="text-white font-semibold text-xl">Shopping Cart</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 glass-card-hover rounded-xl"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center text-white/60 mt-12">
                <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-30" />
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="glass-card p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">{item.name}</h3>
                        <p className="text-gaming-red font-semibold text-lg">€{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-8 h-8 glass-card-hover rounded-lg flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="text-white w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 glass-card-hover rounded-lg flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 hover:text-gaming-red transition-colors"
                      >
                        <X className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-white font-semibold text-lg">Total:</span>
                <span className="text-gaming-red font-bold text-2xl">€{total.toFixed(2)}</span>
              </div>
              <Button onClick={onCheckout} className="glass-button w-full text-lg py-4">
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
export type { CartItem };
