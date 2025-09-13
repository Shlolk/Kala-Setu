import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Award, 
  MapPin, 
  Phone, 
  Mail,
  Palette,
  Clock,
  CheckCircle,
  ChevronDown
} from 'lucide-react';
import { useArtisan } from '@/hooks/useArtisan';
import { useAuth } from '@/hooks/useAuth';

export const ArtisanProfileDropdown: React.FC = () => {
  const { artisanProfile, isArtisan } = useArtisan();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!isArtisan || !artisanProfile) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getVerificationBadge = () => {
    if (artisanProfile.isVerified) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center">
          {getInitials(artisanProfile.name)}
        </div>
        {artisanProfile.isVerified && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <CheckCircle className="h-2.5 w-2.5 text-white" />
          </div>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            {/* Profile Header */}
            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground text-lg font-bold flex items-center justify-center">
                  {getInitials(artisanProfile.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {artisanProfile.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getVerificationBadge()}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Profile Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Palette className="h-4 w-4" />
                <span>{artisanProfile.artworkCategory}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4" />
                <span>{artisanProfile.experience}</span>
              </div>

              {artisanProfile.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{artisanProfile.location}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{artisanProfile.phoneNumber}</span>
              </div>

              {artisanProfile.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{artisanProfile.email}</span>
                </div>
              )}

              {artisanProfile.specialization && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-1">Specialization:</p>
                  <p className="text-sm text-gray-600">
                    {artisanProfile.specialization}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Menu Items */}
            <div className="p-2">
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <User className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </button>

              <div className="border-t border-gray-100 my-2"></div>

              <button 
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
