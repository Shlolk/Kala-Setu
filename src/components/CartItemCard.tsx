import React, { useState } from 'react';
import { CartItem } from '@/types/cart';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Trash2, Star, Truck, Shield, RotateCcw } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = (newQuantity: string) => {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
      updateQuantity(item.id, quantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
  const images = item.images || [item.image];

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 relative">
              <img
                src={images[selectedImage]}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg border"
              />
              {discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  -{discount}%
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-12 h-12 border-2 rounded ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer">
                {item.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleWishlist}
                className="text-gray-400 hover:text-red-500"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {item.brand && (
              <p className="text-sm text-gray-600 mb-1">by {item.brand}</p>
            )}

            {item.rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(item.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                  {item.reviewCount} reviews
                </span>
              </div>
            )}

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

            {/* Variants */}
            {item.variants && (
              <div className="flex flex-wrap gap-4 mb-3">
                {item.variants.color && (
                  <div className="text-sm">
                    <span className="text-gray-600">Color: </span>
                    <span className="font-medium">{item.variants.color}</span>
                  </div>
                )}
                {item.variants.size && (
                  <div className="text-sm">
                    <span className="text-gray-600">Size: </span>
                    <span className="font-medium">{item.variants.size}</span>
                  </div>
                )}
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-3">
              {item.inStock ? (
                <span className="text-green-600 text-sm font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 text-sm font-medium">Out of Stock</span>
              )}
              {item.stockQuantity && item.stockQuantity < 10 && (
                <span className="text-orange-600 text-sm ml-2">
                  Only {item.stockQuantity} left
                </span>
              )}
            </div>

            {/* Shipping Info */}
            {item.shippingInfo && (
              <div className="flex items-center gap-4 mb-3 text-sm">
                {item.shippingInfo.isFreeShipping && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Truck className="h-4 w-4" />
                    <span>FREE Delivery</span>
                  </div>
                )}
                <span className="text-gray-600">
                  Arrives {item.shippingInfo.estimatedDelivery}
                </span>
              </div>
            )}

            {/* Features */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <RotateCcw className="h-4 w-4" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex-shrink-0 lg:w-48">
            <div className="text-right mb-4">
              <div className="text-2xl font-bold text-gray-900">
                ${item.price.toFixed(2)}
              </div>
              {item.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${item.originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity:
                </label>
                <Select value={item.quantity.toString()} onValueChange={handleQuantityChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(Math.min(10, item.stockQuantity || 10))].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Save for later
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            {item.seller && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-600">Sold by </span>
                  <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                    {item.seller}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
