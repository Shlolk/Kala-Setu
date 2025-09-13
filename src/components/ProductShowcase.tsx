import React from 'react';
import { useCart } from '@/hooks/useCart';
import { sampleProducts } from '@/data/sampleProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductShowcase: React.FC = () => {
  const { addItem, totalItems } = useCart();

  const handleAddToCart = (product: typeof sampleProducts[0]) => {
    console.log('Adding product to cart:', product.name);
    addItem(product);
    console.log('Total items after adding:', totalItems + 1);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Traditional Indian Art & Handicrafts</h2>
            <p className="text-gray-600">Discover authentic handcrafted treasures from master artisans across India</p>
          </div>
          <Link to="/cart">
            <Button className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              View Cart
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((product) => {
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
              : 0;

            return (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        -{discount}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-white text-black">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    {product.brand && (
                      <span className="text-xs text-gray-500 ml-2">{product.brand}</span>
                    )}
                  </div>
                  
                  <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-blue-600 cursor-pointer">
                    {product.name}
                  </CardTitle>
                  
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating!) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.reviewCount})
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                    
                    {product.shippingInfo?.isFreeShipping && (
                      <Badge variant="secondary" className="text-green-600">
                        Free Shipping
                      </Badge>
                    )}
                  </div>
                  
                  {product.variants && (
                    <div className="mb-4 text-sm text-gray-600">
                      {product.variants.color && (
                        <span>Color: {product.variants.color}</span>
                      )}
                      {product.variants.size && (
                        <span className="ml-3">Size: {product.variants.size}</span>
                      )}
                    </div>
                  )}
                  
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </Button>
                  
                  {product.stockQuantity && product.stockQuantity < 10 && product.inStock && (
                    <p className="text-sm text-orange-600 mt-2 text-center">
                      Only {product.stockQuantity} left in stock
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
