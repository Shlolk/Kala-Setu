import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartButton: React.FC = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    console.log('Cart button clicked, navigating to /cart');
    console.log('Total items in cart:', totalItems);
    navigate('/cart');
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={handleCartClick}
        className="relative bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="lg"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Cart
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {totalItems}
          </Badge>
        )}
      </Button>
    </div>
  );
};
