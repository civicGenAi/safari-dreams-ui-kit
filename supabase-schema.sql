-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration INTEGER NOT NULL,
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  destination TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Challenging')),
  included JSONB DEFAULT '[]'::jsonb,
  excluded JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add images column to existing packages table (if upgrading)
ALTER TABLE packages ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Create travel_ideas table (specialized packages)
CREATE TABLE IF NOT EXISTS travel_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration INTEGER NOT NULL,
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  destination TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Challenging')),
  included JSONB DEFAULT '[]'::jsonb,
  excluded JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create articles table for Wild Tales blog
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  author_name TEXT NOT NULL DEFAULT 'DeMi Tours Team',
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  read_time INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create article_categories table
CREATE TABLE IF NOT EXISTS article_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert predefined categories
INSERT INTO article_categories (name, slug) VALUES
  ('Travel Tips', 'travel-tips'),
  ('Safari Guides', 'safari-guides'),
  ('Wildlife Facts', 'wildlife-facts'),
  ('Cultural Experiences', 'cultural-experiences'),
  ('Destination Guides', 'destination-guides')
ON CONFLICT (slug) DO NOTHING;

-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for packages (allow public read, authenticated write)
CREATE POLICY "Allow public read access" ON packages
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON packages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON packages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON packages
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for travel_ideas (allow public read, authenticated write)
CREATE POLICY "Allow public read access" ON travel_ideas
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON travel_ideas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON travel_ideas
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON travel_ideas
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for articles
CREATE POLICY "Allow public read published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow authenticated all on articles" ON articles
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for article_categories
CREATE POLICY "Allow public read categories" ON article_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated all on categories" ON article_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for admin_users (only authenticated can read their own data)
CREATE POLICY "Users can read own data" ON admin_users
  FOR SELECT USING (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_travel_ideas_updated_at BEFORE UPDATE ON travel_ideas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create Storage Bucket for Package Images
-- Run this in Supabase Dashboard > Storage
-- Or use the dashboard to create a bucket named 'package-images'

-- STORAGE BUCKET SETUP INSTRUCTIONS:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create new bucket named: package-images
-- 3. Make it public
-- 4. Set the following policies:

-- Storage policies (run after creating bucket)
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'package-images' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'package-images' AND auth.role() = 'authenticated' );

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'package-images' AND auth.role() = 'authenticated' );

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'package-images' AND auth.role() = 'authenticated' );

-- Note: Admin users are created through Supabase Auth, not the admin_users table
-- To create an admin user:
-- 1. Go to Authentication > Users in Supabase Dashboard
-- 2. Click "Add User"
-- 3. Enter email and password
-- 4. User can then login at /admin/login
