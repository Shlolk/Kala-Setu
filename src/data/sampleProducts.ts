import { CartItem } from '@/types/cart';

export const sampleProducts: Omit<CartItem, 'quantity'>[] = [
  {
    id: '1',
    name: 'Traditional Bird Folk Art Painting',
    description: 'Exquisite folk art painting featuring a vibrant peacock with intricate traditional patterns and motifs. This beautiful artwork showcases rich burgundy background with colorful bird imagery and geometric borders in authentic folk art style.',
    price: 2499.99,
    originalPrice: 3499.99,
    image: 'https://www.tallengestore.com/cdn/shop/files/Peacock-MadhubaniPainting-FolkArtOfIndia_3779aadb-2eed-4832-a675-cfa74801e772.jpg?v=1733380868',
    images: [
      'https://www.tallengestore.com/cdn/shop/files/Peacock-MadhubaniPainting-FolkArtOfIndia_3779aadb-2eed-4832-a675-cfa74801e772.jpg?v=1733380868',
      'https://www.tallengestore.com/cdn/shop/files/Peacock-MadhubaniPainting-FolkArtOfIndia_3779aadb-2eed-4832-a675-cfa74801e772.jpg?v=1733380868'
    ],
    category: 'Traditional Art',
    brand: 'Folk Art Heritage',
    rating: 4.8,
    reviewCount: 247,
    inStock: true,
    stockQuantity: 3,
    seller: 'Priya Sharma - Master Artist',
    shippingInfo: {
      isFreeShipping: true,
      estimatedDelivery: 'Sept 12-14'
    },
    variants: {
      size: '16x20 inches',
      style: 'Framed Canvas'
    },
    specifications: {
      'Medium': 'Natural pigments on handmade paper',
      'Origin': 'Traditional Folk Art',
      'Technique': 'Traditional brush painting with geometric patterns',
      'Frame': 'Teak wood with glass protection'
    }
  },
  {
    id: '2',
    name: 'Kashmiri Pashmina Shawl',
    description: 'Luxurious hand-woven Pashmina shawl from Kashmir with intricate embroidery. Made from finest Changthangi goat wool, this shawl represents centuries of Kashmiri craftsmanship.',
    price: 8999.99,
    originalPrice: 12999.99,
    image: '/kashmiri-shawl.jpg',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583846112692-e4b0e4e9c5b5?w=400&h=400&fit=crop'
    ],
    category: 'Textiles',
    brand: 'Kashmir Looms',
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 5,
    seller: 'Himalayan Handicrafts',
    shippingInfo: {
      isFreeShipping: true,
      estimatedDelivery: 'Sept 11-13'
    },
    variants: {
      color: 'Royal Blue with Gold',
      size: '200cm x 70cm'
    }
  },
  {
    id: '3',
    name: 'Blue Pottery Vase Set',
    description: 'Exquisite Jaipur Blue Pottery vase set featuring traditional floral patterns. Handcrafted using ancient techniques with crushed quartz and glass.',
    price: 1899.99,
    originalPrice: 2499.99,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop',
    category: 'Pottery',
    brand: 'Rajasthani Crafts',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 8,
    seller: 'Jaipur Pottery House',
    shippingInfo: {
      isFreeShipping: false,
      estimatedDelivery: 'Sept 13-15',
      shippingCost: 199.99
    },
    variants: {
      color: 'Turquoise Blue',
      size: 'Set of 3 (Small, Medium, Large)'
    }
  },
  {
    id: '4',
    name: 'Sandalwood Carved Ganesha',
    description: 'Intricately carved Lord Ganesha statue in pure sandalwood from Karnataka. This sacred sculpture showcases the finest Indian wood carving traditions with detailed craftsmanship.',
    price: 4299.99,
    image: '/ganesha-carving.jpg',
    category: 'Wood Carving',
    brand: 'Mysore Handicrafts',
    rating: 4.7,
    reviewCount: 134,
    inStock: true,
    stockQuantity: 6,
    seller: 'Rajesh Kumar - Master Carver',
    shippingInfo: {
      isFreeShipping: true,
      estimatedDelivery: 'Sept 10-12'
    },
    variants: {
      size: '8 inches height'
    }
  },
  {
    id: '5',
    name: 'Kundan Jewelry Set',
    description: 'Traditional Kundan jewelry set from Rajasthan featuring uncut diamonds and precious stones. Includes necklace, earrings, and maang tikka with intricate gold work.',
    price: 15999.99,
    originalPrice: 21999.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    category: 'Jewelry',
    brand: 'Royal Rajasthani',
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 2,
    seller: 'Meera Devi - Heritage Jeweler',
    shippingInfo: {
      isFreeShipping: true,
      estimatedDelivery: 'Sept 11-13'
    },
    variants: {
      color: 'Gold with Ruby & Emerald',
      style: 'Bridal Set'
    }
  },
  {
    id: '6',
    name: 'Warli Art Wall Hanging',
    description: 'Traditional Warli tribal art from Maharashtra depicting village life and nature. Painted on cloth using natural white pigment, representing the harmony between humans and nature.',
    price: 1299.99,
    originalPrice: 1799.99,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=400&fit=crop',
    category: 'Tribal Art',
    brand: 'Warli Heritage',
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    stockQuantity: 12,
    seller: 'Tribal Art Collective',
    shippingInfo: {
      isFreeShipping: true,
      estimatedDelivery: 'Sept 12-14'
    },
    variants: {
      size: '24x18 inches',
      color: 'White on Brown Canvas'
    }
  }
];
