-- =============================================================================
-- Migration: 20261012_init_portfolio_cms.sql
-- Description: Full Portfolio CMS Schema with Row Level Security (RLS) & Seed Data
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Table: projects
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  demo_url TEXT DEFAULT '',
  code_url TEXT DEFAULT '',
  is_private_code BOOLEAN DEFAULT false,
  brand_name_arabic TEXT DEFAULT '',
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  tech JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  story JSONB DEFAULT '{}'::jsonb,
  challenges JSONB DEFAULT '[]'::jsonb,
  outcomes JSONB DEFAULT '[]'::jsonb,
  screenshots JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for public queries
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(is_published, display_order);

-- -----------------------------------------------------------------------------
-- 2. Table: skills
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('languages', 'frontend', 'backend', 'tools', 'ai')),
  level TEXT DEFAULT 'Advanced' CHECK (level IN ('Expert', 'Advanced', 'Intermediate')),
  icon TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category, display_order);

-- -----------------------------------------------------------------------------
-- 3. Table: ai_tools
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tag TEXT NOT NULL,
  summary TEXT NOT NULL,
  details TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Terminal',
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_tools_order ON public.ai_tools(display_order);

-- -----------------------------------------------------------------------------
-- 4. Table: experiences
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('experience', 'education', 'certification')),
  title TEXT NOT NULL,
  role_or_degree TEXT DEFAULT '',
  institution TEXT DEFAULT '',
  date_range TEXT NOT NULL,
  description TEXT NOT NULL,
  cert_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_experiences_type ON public.experiences(type, display_order);

-- -----------------------------------------------------------------------------
-- 5. Table: hero_content
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hero_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge_text TEXT DEFAULT 'Available for junior roles & internships',
  title_line_1 TEXT DEFAULT 'Building Digital',
  title_line_2 TEXT DEFAULT 'Experiences That',
  title_line_3 TEXT DEFAULT 'Feel Effortless.',
  description TEXT DEFAULT 'Front-End Engineer focused on high-performance React & Next.js applications, pixel-perfect design systems, and interactive storytelling that converts visitors into clients.',
  primary_cta_label TEXT DEFAULT 'View Selected Work',
  primary_cta_link TEXT DEFAULT '#projects',
  secondary_cta_label TEXT DEFAULT 'Let''s Connect',
  secondary_cta_link TEXT DEFAULT '#contact',
  cv_download_url TEXT DEFAULT '/Files/EBRAHIM_ABDELMONEM_CV.pdf',
  cv_download_filename TEXT DEFAULT 'Ebrahim_Amer_CV.pdf',
  profile_image_url TEXT DEFAULT '/Img/profile.jpg',
  proof_metrics JSONB DEFAULT '[{"value":"9+","label":"Projects Built"},{"value":"4+","label":"Certifications"},{"value":"2026","label":"CS Graduation"}]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 6. Table: about_content
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tag TEXT DEFAULT '04 / STORY & APPROACH',
  title TEXT DEFAULT 'Turning Ideas Into High-Performance Code.',
  paragraph_1 TEXT DEFAULT 'Hi, I''m Ebrahim Abdelmonem Amer, a Computer Science student at Mansoura University (graduating in 2026) specializing in modern front-end architectures. I build responsive, highly interactive web applications that focus on asset size reductions, client-side speed optimizations, and clean, modular execution.',
  paragraph_2 TEXT DEFAULT 'My development philosophy centers around writing readable, maintainable TypeScript and React components, minimizing layout shifts, and ensuring maximum responsiveness across viewports. Whether creating complete e-commerce single-page interfaces or modular administrative panels, I focus on delivering seamless UX that elevates the brand.',
  focus_blocks JSONB DEFAULT '[{"label":"01 / CLEAN CODE","text":"Structuring atomic React file structures with explicit prop types and isolated concerns."},{"label":"02 / PERFORMANCE FIRST","text":"Optimizing page delivery to maintain perfect scores on Google Core Web Vitals."}]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 7. Table: site_settings
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT DEFAULT 'himaamer937@gmail.com',
  phone TEXT DEFAULT '+201096271378',
  location TEXT DEFAULT 'Egypt',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/ebrahim-amer-937-h',
  github_url TEXT DEFAULT 'https://github.com/EbrahimAmer207',
  site_title TEXT DEFAULT 'Ebrahim Amer | Premium Front-End Engineer & React Developer',
  meta_description TEXT DEFAULT 'Sophisticated, performance-first front-end portfolio of Ebrahim Amer. React.js, Next.js, and TypeScript developer focused on building digital experiences that feel effortless.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 8. Table: media_assets
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  size_bytes BIGINT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 9. Row Level Security (RLS) Configuration
-- -----------------------------------------------------------------------------

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Allow anonymous read for published/visible content)
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Public can view visible skills" ON public.skills;
CREATE POLICY "Public can view visible skills"
  ON public.skills FOR SELECT
  USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view visible AI tools" ON public.ai_tools;
CREATE POLICY "Public can view visible AI tools"
  ON public.ai_tools FOR SELECT
  USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view visible experiences" ON public.experiences;
CREATE POLICY "Public can view visible experiences"
  ON public.experiences FOR SELECT
  USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view hero content" ON public.hero_content;
CREATE POLICY "Public can view hero content"
  ON public.hero_content FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view about content" ON public.about_content;
CREATE POLICY "Public can view about content"
  ON public.about_content FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view media assets" ON public.media_assets;
CREATE POLICY "Public can view media assets"
  ON public.media_assets FOR SELECT
  USING (true);

-- Authenticated Admin Policies (Full access to all operations)
DROP POLICY IF EXISTS "Admin full access on projects" ON public.projects;
CREATE POLICY "Admin full access on projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on skills" ON public.skills;
CREATE POLICY "Admin full access on skills"
  ON public.skills FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on ai_tools" ON public.ai_tools;
CREATE POLICY "Admin full access on ai_tools"
  ON public.ai_tools FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on experiences" ON public.experiences;
CREATE POLICY "Admin full access on experiences"
  ON public.experiences FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on hero_content" ON public.hero_content;
CREATE POLICY "Admin full access on hero_content"
  ON public.hero_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on about_content" ON public.about_content;
CREATE POLICY "Admin full access on about_content"
  ON public.about_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on site_settings" ON public.site_settings;
CREATE POLICY "Admin full access on site_settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on media_assets" ON public.media_assets;
CREATE POLICY "Admin full access on media_assets"
  ON public.media_assets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 10. Supabase Storage Bucket Configuration
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access to media bucket
DROP POLICY IF EXISTS "Public media access" ON storage.objects;
CREATE POLICY "Public media access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Admin write/delete access to media bucket
DROP POLICY IF EXISTS "Admin media upload" ON storage.objects;
CREATE POLICY "Admin media upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin media update" ON storage.objects;
CREATE POLICY "Admin media update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Admin media delete" ON storage.objects;
CREATE POLICY "Admin media delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-media');
