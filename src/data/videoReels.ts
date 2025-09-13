import { VideoReel } from '@/types/video';

export const sampleVideoReels: VideoReel[] = [
  {
    id: '1',
    title: 'Traditional Pottery Making - Clay to Art',
    description: 'Watch as I transform raw clay into a beautiful traditional pot using techniques passed down through generations. This process takes patience and skill!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/ganesha-carving.jpg',
    duration: 180,
    views: 125000,
    likes: 8500,
    shares: 1200,
    comments: 450,
    artisan: {
      id: 'artisan-1',
      name: 'Priya Sharma',
      avatar: '/ganesha-carving.jpg',
      verified: true
    },
    craft: {
      category: 'Pottery',
      tags: ['traditional', 'handmade', 'clay', 'pottery', 'art'],
      difficulty: 'Intermediate'
    },
    createdAt: new Date('2024-01-15'),
    isLiked: false,
    isFollowing: false
  },
  {
    id: '2',
    title: 'Intricate Wood Carving Masterpiece',
    description: 'Creating detailed wooden sculptures with traditional tools. Each cut tells a story of our heritage and craftsmanship.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: '/kashmiri-shawl.jpg',
    duration: 240,
    views: 89000,
    likes: 6200,
    shares: 890,
    comments: 320,
    artisan: {
      id: 'artisan-2',
      name: 'Rajesh Kumar',
      avatar: '/kashmiri-shawl.jpg',
      verified: true
    },
    craft: {
      category: 'Wood Carving',
      tags: ['woodwork', 'carving', 'sculpture', 'traditional', 'handcraft'],
      difficulty: 'Advanced'
    },
    createdAt: new Date('2024-01-12'),
    isLiked: false,
    isFollowing: false
  },
  {
    id: '3',
    title: 'Kashmiri Shawl Weaving Process',
    description: 'The intricate art of weaving authentic Kashmiri shawls. Every thread is carefully placed to create these masterpieces.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/ganesha-carving.jpg',
    duration: 300,
    views: 156000,
    likes: 12000,
    shares: 2100,
    comments: 780,
    artisan: {
      id: 'artisan-3',
      name: 'Meera Devi',
      avatar: '/ganesha-carving.jpg',
      verified: true
    },
    craft: {
      category: 'Textile',
      tags: ['weaving', 'kashmiri', 'shawl', 'textile', 'heritage'],
      difficulty: 'Advanced'
    },
    createdAt: new Date('2024-01-10'),
    isLiked: false,
    isFollowing: false
  },
  {
    id: '4',
    title: 'Metal Craft - Brass Engraving Art',
    description: 'Traditional brass engraving techniques creating beautiful decorative pieces. The precision required is incredible!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/kashmiri-shawl.jpg',
    duration: 195,
    views: 73000,
    likes: 5100,
    shares: 650,
    comments: 290,
    artisan: {
      id: 'artisan-4',
      name: 'Kavita Singh',
      avatar: '/kashmiri-shawl.jpg',
      verified: false
    },
    craft: {
      category: 'Metal Craft',
      tags: ['brass', 'engraving', 'metalwork', 'decorative', 'traditional'],
      difficulty: 'Intermediate'
    },
    createdAt: new Date('2024-01-08'),
    isLiked: false,
    isFollowing: false
  },
  {
    id: '5',
    title: 'Stone Carving - Marble Sculpture',
    description: 'Watch the transformation of raw marble into a stunning sculpture. This ancient art form requires years of practice.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: '/ganesha-carving.jpg',
    duration: 420,
    views: 201000,
    likes: 15600,
    shares: 3200,
    comments: 1100,
    artisan: {
      id: 'artisan-5',
      name: 'Ravi Artisan',
      avatar: '/ganesha-carving.jpg',
      verified: true
    },
    craft: {
      category: 'Stone Carving',
      tags: ['marble', 'sculpture', 'carving', 'stone', 'art'],
      difficulty: 'Advanced'
    },
    createdAt: new Date('2024-01-05'),
    isLiked: false,
    isFollowing: false
  },
  {
    id: '6',
    title: 'Jewelry Making - Traditional Techniques',
    description: 'Creating exquisite jewelry pieces using age-old techniques. Every piece tells a story of tradition and elegance.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: '/kashmiri-shawl.jpg',
    duration: 165,
    views: 94000,
    likes: 7800,
    shares: 1100,
    comments: 420,
    artisan: {
      id: 'artisan-6',
      name: 'Arjun Patel',
      avatar: '/kashmiri-shawl.jpg',
      verified: true
    },
    craft: {
      category: 'Jewelry',
      tags: ['jewelry', 'traditional', 'gold', 'silver', 'handmade'],
      difficulty: 'Intermediate'
    },
    createdAt: new Date('2024-01-03'),
    isLiked: false,
    isFollowing: false
  }
];
