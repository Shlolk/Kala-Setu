import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageCircle, 
  Share, 
  UserPlus,
  MoreHorizontal,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoReel } from '@/types/video';
import { cn } from '@/lib/utils';

interface VideoReelsProps {
  videos: VideoReel[];
  className?: string;
}

export const VideoReels = ({ videos, className }: VideoReelsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [followedArtisans, setFollowedArtisans] = useState<Set<string>>(new Set());
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play current video
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play().catch(console.error);
      } else {
        currentVideo.pause();
      }
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isPlaying]);

  // Handle scroll to change videos
  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleScroll('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleScroll('down');
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          setIsMuted(!isMuted);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying, isMuted]);

  const toggleLike = (videoId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const toggleFollow = (artisanId: string) => {
    setFollowedArtisans(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artisanId)) {
        newSet.delete(artisanId);
      } else {
        newSet.add(artisanId);
      }
      return newSet;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!videos.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>No videos available</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative h-screen overflow-hidden bg-black",
        className
      )}
    >
      {/* Navigation Arrows */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleScroll('up')}
          disabled={currentIndex === 0}
          className="text-white hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleScroll('down')}
          disabled={currentIndex === videos.length - 1}
          className="text-white hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>

      {/* Video Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative h-full w-full"
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={cn(
                "absolute inset-0 w-full h-full",
                index === currentIndex ? "block" : "hidden"
              )}
            >
              {/* Video Element */}
              <video
                ref={el => videoRefs.current[index] = el}
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={() => setIsPlaying(!isPlaying)}
              />

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Play/Pause Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setIsPlaying(true)}
                      className="text-white hover:bg-white/20 w-20 h-20 rounded-full"
                    >
                      <Play className="w-10 h-10 ml-1" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex justify-between items-end">
                  {/* Left Side - Video Info */}
                  <div className="flex-1 pr-4">
                    {/* Artisan Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={video.artisan.avatar}
                        alt={video.artisan.name}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{video.artisan.name}</span>
                          {video.artisan.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-300">
                          {video.craft.category} • {video.craft.difficulty}
                        </div>
                      </div>
                      {!followedArtisans.has(video.artisan.id) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFollow(video.artisan.id)}
                          className="ml-auto border-white text-white hover:bg-white hover:text-black"
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Follow
                        </Button>
                      )}
                    </div>

                    {/* Video Title & Description */}
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      {video.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {video.craft.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>{formatNumber(video.views)} views</span>
                      <span>•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Right Side - Action Buttons */}
                  <div className="flex flex-col items-center gap-6">
                    {/* Like Button */}
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => toggleLike(video.id)}
                        className={cn(
                          "w-12 h-12 rounded-full hover:bg-white/20",
                          likedVideos.has(video.id) ? "text-red-500" : "text-white"
                        )}
                      >
                        <Heart 
                          className={cn(
                            "w-6 h-6",
                            likedVideos.has(video.id) && "fill-current"
                          )} 
                        />
                      </Button>
                      <span className="text-xs mt-1">
                        {formatNumber(video.likes + (likedVideos.has(video.id) ? 1 : 0))}
                      </span>
                    </div>

                    {/* Comment Button */}
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-12 h-12 rounded-full text-white hover:bg-white/20"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </Button>
                      <span className="text-xs mt-1">{formatNumber(video.comments)}</span>
                    </div>

                    {/* Share Button */}
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-12 h-12 rounded-full text-white hover:bg-white/20"
                      >
                        <Share className="w-6 h-6" />
                      </Button>
                      <span className="text-xs mt-1">{formatNumber(video.shares)}</span>
                    </div>

                    {/* Mute Button */}
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-12 h-12 rounded-full text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </Button>

                    {/* More Options */}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-12 h-12 rounded-full text-white hover:bg-white/20"
                    >
                      <MoreHorizontal className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex gap-1">
                  {videos.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors",
                        idx === currentIndex ? "bg-white" : "bg-white/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute top-4 right-4 text-white text-sm bg-black/50 rounded-lg p-2">
        <p>↑↓ Navigate • Space Play/Pause • M Mute</p>
      </div>
    </div>
  );
};
