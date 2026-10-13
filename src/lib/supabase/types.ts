export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectStory {
  problem: string;
  solution: string;
  result: string;
}

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  demo_url: string;
  code_url: string;
  is_private_code: boolean;
  brand_name_arabic?: string | null;
  description: string;
  long_description: string;
  tech: string[];
  metrics: ProjectMetric[];
  story: ProjectStory;
  challenges: string[];
  outcomes: string[];
  screenshots: ProjectScreenshot[];
  featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SkillRecord {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools' | 'ai';
  level: 'Expert' | 'Advanced' | 'Intermediate';
  icon?: string;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AIToolRecord {
  id: string;
  name: string;
  tag: string;
  summary: string;
  details: string;
  icon_name: string;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceRecord {
  id: string;
  type: 'experience' | 'education' | 'certification';
  title: string;
  role_or_degree: string;
  institution?: string;
  date_range: string;
  description: string;
  cert_url?: string;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface HeroContentRecord {
  id: string;
  badge_text: string;
  title_line_1: string;
  title_line_2: string;
  title_line_3: string;
  description: string;
  primary_cta_label: string;
  primary_cta_link: string;
  secondary_cta_label: string;
  secondary_cta_link: string;
  cv_download_url: string;
  cv_download_filename: string;
  profile_image_url: string;
  proof_metrics: { value: string; label: string }[];
  updated_at?: string;
}

export interface AboutContentRecord {
  id: string;
  tag: string;
  title: string;
  paragraph_1: string;
  paragraph_2: string;
  focus_blocks: { label: string; text: string }[];
  updated_at?: string;
}

export interface SiteSettingsRecord {
  id: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  site_title: string;
  meta_description: string;
  updated_at?: string;
}

export interface MediaAssetRecord {
  id: string;
  filename: string;
  storage_path: string;
  public_url: string;
  size_bytes?: number;
  mime_type?: string;
  created_at?: string;
}
