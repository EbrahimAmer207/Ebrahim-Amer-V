import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicProjects, getPublicProjectBySlug } from '@/lib/supabase/data';
import { Project } from '@/data/projectsData';
import CaseStudyClient from './CaseStudyClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getPublicProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Case Study Not Found | Ebrahim Amer',
      description: 'The requested case study could not be found.',
    };
  }

  return {
    title: `${project.title} | Case Study | Ebrahim Amer`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study by Ebrahim Amer`,
      description: project.description,
      url: `https://ebrahim-amer.vercel.app/projects/${project.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study`,
      description: project.description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const projectRecord = await getPublicProjectBySlug(slug);

  if (!projectRecord) {
    notFound();
  }

  const project: Project = {
    slug: projectRecord.slug,
    title: projectRecord.title,
    category: projectRecord.category,
    demoUrl: projectRecord.demo_url,
    codeUrl: projectRecord.code_url,
    isPrivateCode: projectRecord.is_private_code,
    brandNameArabic: projectRecord.brand_name_arabic || undefined,
    description: projectRecord.description,
    longDescription: projectRecord.long_description,
    tech: projectRecord.tech || [],
    metrics: projectRecord.metrics || [],
    story: projectRecord.story || { problem: '', solution: '', result: '' },
    challenges: projectRecord.challenges || [],
    outcomes: projectRecord.outcomes || [],
    screenshots: projectRecord.screenshots || [],
  };

  return <CaseStudyClient project={project} />;
}
