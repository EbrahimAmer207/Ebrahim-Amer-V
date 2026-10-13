import { 
  getPublicProjects, 
  getPublicHeroContent, 
  getPublicAboutContent, 
  getPublicSkills, 
  getPublicAITools, 
  getPublicExperiences, 
  getPublicSiteSettings 
} from '@/lib/supabase/data';
import PortfolioClient from '@/components/layout/PortfolioClient';

// Enable ISR / cache revalidation
export const revalidate = 60;

export default async function Home() {
  const [projects, hero, about, skills, aiTools, experiences, settings] = await Promise.all([
    getPublicProjects(),
    getPublicHeroContent(),
    getPublicAboutContent(),
    getPublicSkills(),
    getPublicAITools(),
    getPublicExperiences(),
    getPublicSiteSettings(),
  ]);

  return (
    <PortfolioClient
      initialData={{
        projects,
        hero,
        about,
        skills,
        aiTools,
        experiences,
        settings,
      }}
    />
  );
}
