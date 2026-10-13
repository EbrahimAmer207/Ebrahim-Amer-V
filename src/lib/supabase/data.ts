import { createClient, isSupabaseServerConfigured } from './server';
import { 
  ProjectRecord, 
  SkillRecord, 
  AIToolRecord, 
  ExperienceRecord, 
  HeroContentRecord, 
  AboutContentRecord, 
  SiteSettingsRecord
} from './types';
import { projectsData } from '@/data/projectsData';

// ── Default Fallback Data (Preserves 100% of existing portfolio content) ──────

export const fallbackHero: HeroContentRecord = {
  id: 'default-hero',
  badge_text: 'Available for junior roles & internships',
  title_line_1: 'Building Digital',
  title_line_2: 'Experiences That',
  title_line_3: 'Feel Effortless.',
  description: 'Front-End Engineer focused on high-performance React & Next.js applications, pixel-perfect design systems, and interactive storytelling that converts visitors into clients.',
  primary_cta_label: 'View Selected Work',
  primary_cta_link: '#projects',
  secondary_cta_label: "Let's Connect",
  secondary_cta_link: '#contact',
  cv_download_url: '/Files/EBRAHIM_ABDELMONEM_CV.pdf',
  cv_download_filename: 'Ebrahim_Amer_CV.pdf',
  profile_image_url: '/Img/profile.jpg',
  proof_metrics: [
    { value: '9+', label: 'Projects Built' },
    { value: '4+', label: 'Certifications' },
    { value: '2026', label: 'CS Graduation' },
  ],
};

export const fallbackAbout: AboutContentRecord = {
  id: 'default-about',
  tag: '04 / STORY & APPROACH',
  title: 'Turning Ideas Into High-Performance Code.',
  paragraph_1: 'Hi, I’m Ebrahim Abdelmonem Amer, a Computer Science student at Mansoura University (graduating in 2026) specializing in modern front-end architectures. I build responsive, highly interactive web applications that focus on asset size reductions, client-side speed optimizations, and clean, modular execution.',
  paragraph_2: 'My development philosophy centers around writing readable, maintainable TypeScript and React components, minimizing layout shifts, and ensuring maximum responsiveness across viewports. Whether creating complete e-commerce single-page interfaces or modular administrative panels, I focus on delivering seamless UX that elevates the brand.',
  focus_blocks: [
    { label: '01 / CLEAN CODE', text: 'Structuring atomic React file structures with explicit prop types and isolated concerns.' },
    { label: '02 / PERFORMANCE FIRST', text: 'Optimizing page delivery to maintain perfect scores on Google Core Web Vitals.' },
  ],
};

export const fallbackSiteSettings: SiteSettingsRecord = {
  id: 'default-settings',
  email: 'himaamer937@gmail.com',
  phone: '+20 109 627 1378',
  location: 'Mansoura, Egypt',
  linkedin_url: 'https://www.linkedin.com/in/ebrahim-amer0/',
  github_url: 'https://github.com/EbrahimAmer207',
  site_title: 'Ebrahim Amer | Premium Front-End Engineer & React Developer',
  meta_description: 'Sophisticated, performance-first front-end portfolio of Ebrahim Amer. React.js, Next.js, and TypeScript developer focused on building digital experiences that feel effortless.',
};

export const fallbackSkills: SkillRecord[] = [
  { id: 'sk-1', name: 'JavaScript ES6+', category: 'languages', level: 'Expert', display_order: 1, is_visible: true },
  { id: 'sk-2', name: 'TypeScript', category: 'languages', level: 'Advanced', display_order: 2, is_visible: true },
  { id: 'sk-3', name: 'SQL', category: 'languages', level: 'Advanced', display_order: 3, is_visible: true },
  { id: 'sk-4', name: 'Python', category: 'languages', level: 'Intermediate', display_order: 4, is_visible: true },
  { id: 'sk-5', name: 'C++', category: 'languages', level: 'Intermediate', display_order: 5, is_visible: true },
  { id: 'sk-6', name: 'C#', category: 'languages', level: 'Intermediate', display_order: 6, is_visible: true },

  { id: 'sk-7', name: 'React.js (v19)', category: 'frontend', level: 'Expert', display_order: 7, is_visible: true },
  { id: 'sk-8', name: 'Next.js (App Router)', category: 'frontend', level: 'Expert', display_order: 8, is_visible: true },
  { id: 'sk-9', name: 'HTML5 & CSS3', category: 'frontend', level: 'Expert', display_order: 9, is_visible: true },
  { id: 'sk-10', name: 'TanStack Query', category: 'frontend', level: 'Advanced', display_order: 10, is_visible: true },
  { id: 'sk-11', name: 'Redux Toolkit', category: 'frontend', level: 'Advanced', display_order: 11, is_visible: true },
  { id: 'sk-12', name: 'Context API', category: 'frontend', level: 'Expert', display_order: 12, is_visible: true },
  { id: 'sk-13', name: 'Tailwind CSS', category: 'frontend', level: 'Expert', display_order: 13, is_visible: true },
  { id: 'sk-14', name: 'Bootstrap 5', category: 'frontend', level: 'Expert', display_order: 14, is_visible: true },
  { id: 'sk-15', name: 'Vite', category: 'frontend', level: 'Expert', display_order: 15, is_visible: true },

  { id: 'sk-16', name: 'SQLite WASM', category: 'backend', level: 'Advanced', display_order: 16, is_visible: true },
  { id: 'sk-17', name: 'RESTful APIs', category: 'backend', level: 'Expert', display_order: 17, is_visible: true },
  { id: 'sk-18', name: 'MySQL', category: 'backend', level: 'Advanced', display_order: 18, is_visible: true },
  { id: 'sk-19', name: 'Laravel', category: 'backend', level: 'Advanced', display_order: 19, is_visible: true },
  { id: 'sk-20', name: 'PHP', category: 'backend', level: 'Advanced', display_order: 20, is_visible: true },
  { id: 'sk-21', name: 'MVC Architecture', category: 'backend', level: 'Advanced', display_order: 21, is_visible: true },
  { id: 'sk-22', name: 'OOP Concepts', category: 'backend', level: 'Advanced', display_order: 22, is_visible: true },

  { id: 'sk-23', name: 'Git & GitHub', category: 'tools', level: 'Expert', display_order: 23, is_visible: true },
  { id: 'sk-24', name: 'Google Antigravity', category: 'tools', level: 'Expert', display_order: 24, is_visible: true },
  { id: 'sk-25', name: 'ChatGPT', category: 'tools', level: 'Expert', display_order: 25, is_visible: true },
  { id: 'sk-26', name: 'Performance Audit', category: 'tools', level: 'Advanced', display_order: 26, is_visible: true },
  { id: 'sk-27', name: 'Problem Solving', category: 'tools', level: 'Expert', display_order: 27, is_visible: true },
  { id: 'sk-28', name: 'Data Structures', category: 'tools', level: 'Advanced', display_order: 28, is_visible: true },
  { id: 'sk-29', name: 'Algorithms', category: 'tools', level: 'Advanced', display_order: 29, is_visible: true },
];

export const fallbackAITools: AIToolRecord[] = [
  {
    id: 'ai-1',
    name: 'Google Antigravity',
    tag: 'Workflow & Coding',
    summary: 'AI-assisted coding and development workflows.',
    details: 'Leveraging agentic development workflows, project-wide reasoning, and terminal verification while keeping software architecture and system boundaries human-driven.',
    icon_name: 'Terminal',
    display_order: 1,
    is_visible: true,
  },
  {
    id: 'ai-2',
    name: 'ChatGPT',
    tag: 'Problem-Solving & Analysis',
    summary: 'Technical problem-solving, code explanations, debugging assistance, and development planning.',
    details: 'Evaluating architectural trade-offs, accelerating complex API explorations, and structuring implementation approaches before committing production code.',
    icon_name: 'Sparkles',
    display_order: 2,
    is_visible: true,
  },
  {
    id: 'ai-3',
    name: 'AI-Assisted Development',
    tag: 'Implementation Workflow',
    summary: 'Supporting implementation, refactoring, and development workflows with AI tools.',
    details: 'Accelerating component scaffolding, modular refactoring routines, and repetitive boilerplate generation without compromising code clarity or structure.',
    icon_name: 'Workflow',
    display_order: 3,
    is_visible: true,
  },
  {
    id: 'ai-4',
    name: 'Prompt Engineering',
    tag: 'Context & Precision',
    summary: 'Writing structured prompts for relevant and actionable development outputs.',
    details: 'Formulating clear technical constraints, supplying localized codebase context, and guiding AI outputs toward deterministic, type-safe implementations.',
    icon_name: 'Binary',
    display_order: 4,
    is_visible: true,
  },
  {
    id: 'ai-5',
    name: 'AI-Powered Debugging',
    tag: 'Root-Cause Analysis',
    summary: 'Investigating errors, evaluating potential fixes, and understanding root causes.',
    details: 'Diagnosing tricky stack traces, analyzing edge cases in asynchronous state, and evaluating remediation approaches before committing fixes.',
    icon_name: 'ShieldCheck',
    display_order: 5,
    is_visible: true,
  },
];

export const fallbackExperiences: ExperienceRecord[] = [
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Egypt Digital Pioneers Initiative (DEPI)',
    role_or_degree: 'Frontend Development Fellow',
    institution: 'Ministry of Communications & Information Technology',
    date_range: 'Jul 2025 - Dec 2025',
    description: 'Developed scalable and responsive web applications using React.js within an industry-simulated environment. Collaborated using Git and Agile methodologies to deliver optimized components, integrated APIs, and participated in regular peer code reviews.',
    cert_url: '/Files/Ebrahim Abdelmonem Ebrahim.pdf',
    display_order: 1,
    is_visible: true,
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'NTI Creativa Initiative',
    role_or_degree: 'Frontend Trainee',
    institution: 'National Telecommunication Institute (NTI)',
    date_range: 'Aug 2025 - Oct 2025',
    description: 'Focused on creating responsive, semantic HTML5, CSS3, and JavaScript layouts. Worked on cross-browser compatibility, DOM manipulation, and modular UI layouts under professional mentoring guidelines.',
    cert_url: '/Files/Ebrahim Abdelmonem Ebrahim Ebrahim.pdf',
    display_order: 2,
    is_visible: true,
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'Mansoura University',
    role_or_degree: 'Bachelor of Computer Science',
    institution: 'Faculty of Computers and Information',
    date_range: '2022 - 2026 (Expected)',
    description: 'Studying core algorithms, data structures, object-oriented programming (OOP), system design, and database systems.',
    cert_url: '',
    display_order: 3,
    is_visible: true,
  },
  {
    id: 'cert-1',
    type: 'certification',
    title: 'React.js Advanced Diploma',
    role_or_degree: 'T-Square Academy',
    institution: 'T-Square Academy',
    date_range: 'Jul 2024 - Nov 2024',
    description: 'Advanced training in React concepts: Hook lifecycles, Context APIs, React Router, client-side routing, and global state management using Redux Toolkit.',
    cert_url: '',
    display_order: 4,
    is_visible: true,
  },
  {
    id: 'cert-2',
    type: 'certification',
    title: 'Laravel Backend Diploma',
    role_or_degree: 'T-Square Academy',
    institution: 'T-Square Academy',
    date_range: 'Nov 2024 - Mar 2025',
    description: 'Focused on MVC architecture, database migrations, model relationships, routing, authentication, and RESTful API development.',
    cert_url: '',
    display_order: 5,
    is_visible: true,
  },
];

// Map static Project model to database ProjectRecord model
export function mapStaticToProjectRecord(p: typeof projectsData[0], index: number): ProjectRecord {
  return {
    id: `project-${p.slug}`,
    slug: p.slug,
    title: p.title,
    category: p.category,
    demo_url: p.demoUrl,
    code_url: p.codeUrl,
    is_private_code: Boolean(p.isPrivateCode),
    brand_name_arabic: p.brandNameArabic || null,
    description: p.description,
    long_description: p.longDescription,
    tech: p.tech,
    metrics: p.metrics,
    story: p.story,
    challenges: p.challenges,
    outcomes: p.outcomes,
    screenshots: p.screenshots || [],
    featured: index < 3,
    is_published: true,
    display_order: index + 1,
  };
}

export const fallbackProjects: ProjectRecord[] = projectsData.map(mapStaticToProjectRecord);

// ── Public Data Fetchers (Safe Server-side Data Access) ──────────────────────

export async function getPublicProjects(): Promise<ProjectRecord[]> {
  if (!isSupabaseServerConfigured()) {
    return fallbackProjects;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackProjects;
    }

    return data as ProjectRecord[];
  } catch {
    return fallbackProjects;
  }
}

export async function getPublicProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  if (!isSupabaseServerConfigured()) {
    return fallbackProjects.find(p => p.slug === slug) || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !data) {
      return fallbackProjects.find(p => p.slug === slug) || null;
    }

    return data as ProjectRecord;
  } catch {
    return fallbackProjects.find(p => p.slug === slug) || null;
  }
}

export async function getPublicHeroContent(): Promise<HeroContentRecord> {
  if (!isSupabaseServerConfigured()) {
    return fallbackHero;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      return fallbackHero;
    }

    return data as HeroContentRecord;
  } catch {
    return fallbackHero;
  }
}

export async function getPublicAboutContent(): Promise<AboutContentRecord> {
  if (!isSupabaseServerConfigured()) {
    return fallbackAbout;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      return fallbackAbout;
    }

    return data as AboutContentRecord;
  } catch {
    return fallbackAbout;
  }
}

export async function getPublicSkills(): Promise<SkillRecord[]> {
  if (!isSupabaseServerConfigured()) {
    return fallbackSkills;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackSkills;
    }

    return data as SkillRecord[];
  } catch {
    return fallbackSkills;
  }
}

export async function getPublicAITools(): Promise<AIToolRecord[]> {
  if (!isSupabaseServerConfigured()) {
    return fallbackAITools;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackAITools;
    }

    return data as AIToolRecord[];
  } catch {
    return fallbackAITools;
  }
}

export async function getPublicExperiences(): Promise<ExperienceRecord[]> {
  if (!isSupabaseServerConfigured()) {
    return fallbackExperiences;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackExperiences;
    }

    return data as ExperienceRecord[];
  } catch {
    return fallbackExperiences;
  }
}

export async function getPublicSiteSettings(): Promise<SiteSettingsRecord> {
  if (!isSupabaseServerConfigured()) {
    return fallbackSiteSettings;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      return fallbackSiteSettings;
    }

    return data as SiteSettingsRecord;
  } catch {
    return fallbackSiteSettings;
  }
}
