import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/projectsData';
import CaseStudyClient from './CaseStudyClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

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
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
