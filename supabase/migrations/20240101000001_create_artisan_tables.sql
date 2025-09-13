-- Create artisan_profiles table
CREATE TABLE IF NOT EXISTS public.artisan_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    experience TEXT NOT NULL,
    artwork_category TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    location TEXT,
    specialization TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create artwork_submissions table
CREATE TABLE IF NOT EXISTS public.artwork_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    artisan_id UUID REFERENCES public.artisan_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2),
    materials TEXT[],
    dimensions TEXT,
    time_to_create TEXT,
    images TEXT[],
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_user_id ON public.artisan_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_artwork_category ON public.artisan_profiles(artwork_category);
CREATE INDEX IF NOT EXISTS idx_artwork_submissions_artisan_id ON public.artwork_submissions(artisan_id);
CREATE INDEX IF NOT EXISTS idx_artwork_submissions_category ON public.artwork_submissions(category);
CREATE INDEX IF NOT EXISTS idx_artwork_submissions_status ON public.artwork_submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.artisan_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for artisan_profiles
CREATE POLICY "Users can view all artisan profiles" ON public.artisan_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own artisan profile" ON public.artisan_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own artisan profile" ON public.artisan_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own artisan profile" ON public.artisan_profiles
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for artwork_submissions
CREATE POLICY "Users can view approved artwork submissions" ON public.artwork_submissions
    FOR SELECT USING (status = 'approved' OR EXISTS (
        SELECT 1 FROM public.artisan_profiles 
        WHERE id = artisan_id AND user_id = auth.uid()
    ));

CREATE POLICY "Artisans can insert their own artwork submissions" ON public.artwork_submissions
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM public.artisan_profiles 
        WHERE id = artisan_id AND user_id = auth.uid()
    ));

CREATE POLICY "Artisans can update their own artwork submissions" ON public.artwork_submissions
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM public.artisan_profiles 
        WHERE id = artisan_id AND user_id = auth.uid()
    ));

CREATE POLICY "Artisans can delete their own artwork submissions" ON public.artwork_submissions
    FOR DELETE USING (EXISTS (
        SELECT 1 FROM public.artisan_profiles 
        WHERE id = artisan_id AND user_id = auth.uid()
    ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_artisan_profiles_updated_at
    BEFORE UPDATE ON public.artisan_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_artwork_submissions_updated_at
    BEFORE UPDATE ON public.artwork_submissions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
