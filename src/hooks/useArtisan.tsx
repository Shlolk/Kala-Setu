import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ArtisanProfile, ArtworkSubmission } from '@/types/artisan';
import { useAuth } from './useAuth';

export interface UseArtisanReturn {
  artisanProfile: ArtisanProfile | null;
  isArtisan: boolean;
  loading: boolean;
  error: string | null;
  createArtisanProfile: (profile: Omit<ArtisanProfile, 'id' | 'userId' | 'isVerified'>) => Promise<void>;
  updateArtisanProfile: (updates: Partial<ArtisanProfile>) => Promise<void>;
  submitArtwork: (artwork: Omit<ArtworkSubmission, 'id' | 'artisanId' | 'status'>) => Promise<void>;
  getArtworkSubmissions: () => Promise<ArtworkSubmission[]>;
}

export const useArtisan = (): UseArtisanReturn => {
  const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const isArtisan = !!artisanProfile;

  // Fetch artisan profile on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchArtisanProfile();
    } else {
      setArtisanProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchArtisanProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('artisan_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setArtisanProfile({
          id: data.id,
          userId: data.user_id || '',
          name: data.name,
          experience: data.experience,
          artworkCategory: data.artwork_category,
          phoneNumber: data.phone_number,
          email: data.email || '',
          location: data.location || '',
          specialization: data.specialization || '',
          isVerified: data.is_verified
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch artisan profile');
    } finally {
      setLoading(false);
    }
  };

  const createArtisanProfile = async (profile: Omit<ArtisanProfile, 'id' | 'userId' | 'isVerified'>) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('artisan_profiles')
        .insert({
          user_id: user.id,
          name: profile.name,
          experience: profile.experience,
          artwork_category: profile.artworkCategory,
          phone_number: profile.phoneNumber,
          email: profile.email || null,
          location: profile.location || null,
          specialization: profile.specialization || null,
          is_verified: false
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newProfile: ArtisanProfile = {
          id: data.id,
          userId: data.user_id || '',
          name: data.name,
          experience: data.experience,
          artworkCategory: data.artwork_category,
          phoneNumber: data.phone_number,
          email: data.email || '',
          location: data.location || '',
          specialization: data.specialization || '',
          isVerified: data.is_verified
        };
        setArtisanProfile(newProfile);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create artisan profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateArtisanProfile = async (updates: Partial<ArtisanProfile>) => {
    if (!user || !artisanProfile) throw new Error('User must be authenticated and have an artisan profile');

    try {
      setLoading(true);
      setError(null);

      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.experience) updateData.experience = updates.experience;
      if (updates.artworkCategory) updateData.artwork_category = updates.artworkCategory;
      if (updates.phoneNumber) updateData.phone_number = updates.phoneNumber;
      if (updates.email !== undefined) updateData.email = updates.email || null;
      if (updates.location !== undefined) updateData.location = updates.location || null;
      if (updates.specialization !== undefined) updateData.specialization = updates.specialization || null;

      const { data, error } = await supabase
        .from('artisan_profiles')
        .update(updateData)
        .eq('id', artisanProfile.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setArtisanProfile({
          id: data.id,
          userId: data.user_id || '',
          name: data.name,
          experience: data.experience,
          artworkCategory: data.artwork_category,
          phoneNumber: data.phone_number,
          email: data.email || '',
          location: data.location || '',
          specialization: data.specialization || '',
          isVerified: data.is_verified
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update artisan profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitArtwork = async (artwork: Omit<ArtworkSubmission, 'id' | 'artisanId' | 'status'>) => {
    if (!artisanProfile) throw new Error('Must be registered as artisan');

    try {
      setError(null);

      const { error } = await supabase
        .from('artwork_submissions')
        .insert({
          artisan_id: artisanProfile.id,
          title: artwork.title,
          description: artwork.description,
          category: artwork.category,
          price: artwork.price || null,
          materials: artwork.materials || null,
          dimensions: artwork.dimensions || null,
          time_to_create: artwork.timeToCreate || null,
          images: artwork.images || null,
          status: 'pending'
        });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit artwork');
      throw err;
    }
  };

  const getArtworkSubmissions = async (): Promise<ArtworkSubmission[]> => {
    if (!artisanProfile) return [];

    try {
      setError(null);

      const { data, error } = await supabase
        .from('artwork_submissions')
        .select('*')
        .eq('artisan_id', artisanProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data?.map(item => ({
        id: item.id,
        artisanId: item.artisan_id || '',
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price || 0,
        materials: item.materials || [],
        dimensions: item.dimensions || '',
        timeToCreate: item.time_to_create || '',
        images: item.images || [],
        status: item.status as 'pending' | 'approved' | 'rejected'
      })) || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch artwork submissions');
      return [];
    }
  };

  return {
    artisanProfile,
    isArtisan,
    loading,
    error,
    createArtisanProfile,
    updateArtisanProfile,
    submitArtwork,
    getArtworkSubmissions
  };
};
