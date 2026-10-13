import { NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackProjects, fallbackSkills, fallbackExperiences } from '@/lib/supabase/data';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  if (!isSupabaseServerConfigured()) {
    const totalProjects = fallbackProjects.length;
    const publishedProjects = fallbackProjects.filter(p => p.is_published).length;
    const draftProjects = totalProjects - publishedProjects;
    const totalSkills = fallbackSkills.length;
    const totalExperiences = fallbackExperiences.filter(e => e.type === 'experience').length;
    const totalCertifications = fallbackExperiences.filter(e => e.type === 'certification').length;
    const totalEducation = fallbackExperiences.filter(e => e.type === 'education').length;

    return NextResponse.json({
      data: {
        totalProjects,
        publishedProjects,
        draftProjects,
        totalSkills,
        totalExperiences,
        totalCertifications,
        totalEducation,
        isConfigured: false,
        recentUpdates: [
          { item: 'Growfet Platform', type: 'Project', time: 'Active' },
          { item: 'Rashet Etr Fragrance', type: 'Project', time: 'Active' },
          { item: 'Growfet Tech Services', type: 'Project', time: 'Active' },
        ],
      },
    });
  }

  try {
    const supabase = await createClient();

    // Perform real database count queries
    const [projectsRes, skillsRes, expRes] = await Promise.all([
      supabase.from('projects').select('id, title, is_published, updated_at').order('updated_at', { ascending: false }),
      supabase.from('skills').select('id, is_visible'),
      supabase.from('experiences').select('id, type, is_visible'),
    ]);

    const projects = projectsRes.data || [];
    const skills = skillsRes.data || [];
    const experiences = expRes.data || [];

    const totalProjects = projects.length;
    const publishedProjects = projects.filter(p => p.is_published).length;
    const draftProjects = totalProjects - publishedProjects;
    const totalSkills = skills.length;
    const totalExperiences = experiences.filter(e => e.type === 'experience').length;
    const totalCertifications = experiences.filter(e => e.type === 'certification').length;
    const totalEducation = experiences.filter(e => e.type === 'education').length;

    const recentUpdates = projects.slice(0, 5).map(p => ({
      item: p.title,
      type: 'Project',
      time: p.updated_at ? new Date(p.updated_at).toLocaleDateString() : 'Recent',
    }));

    return NextResponse.json({
      data: {
        totalProjects,
        publishedProjects,
        draftProjects,
        totalSkills,
        totalExperiences,
        totalCertifications,
        totalEducation,
        isConfigured: true,
        recentUpdates,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching stats';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
