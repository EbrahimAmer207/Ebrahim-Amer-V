-- =============================================================================
-- Migration: 20261012_harden_admin_rls.sql
-- Description: Production-hardened Row Level Security (RLS) policies.
--              Restricts all CMS table modifications and storage uploads
--              strictly to the verified administrator account.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Helper Function: public.is_admin()
-- -----------------------------------------------------------------------------
-- Evaluates whether the current caller's JWT belongs to the authorized administrator.
-- Hardened against privilege escalation, search_path injection, and mutable source risks.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
STABLE
AS $$
DECLARE
  v_email TEXT;
  v_role  TEXT;
BEGIN
  -- 1. Must be an authenticated user
  IF auth.role() <> 'authenticated' THEN
    RETURN FALSE;
  END IF;

  v_email := lower(coalesce(auth.jwt() ->> 'email', ''));
  v_role  := coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '');

  -- 2. Trustworthy source A: app_metadata.role = 'admin' (tamper-proof, set via Supabase Dashboard/service_role)
  IF v_role = 'admin' THEN
    RETURN TRUE;
  END IF;

  -- 3. Trustworthy source B: Verified administrator email address
  IF v_email = 'himaamer937@gmail.com' THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$;

-- Restrict execution: only authenticated sessions and service_role can execute is_admin()
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 2. Harden CMS Table Policies
-- -----------------------------------------------------------------------------

-- Table: projects
DROP POLICY IF EXISTS "Admin full access on projects" ON public.projects;
CREATE POLICY "Admin full access on projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Table: skills
DROP POLICY IF EXISTS "Admin full access on skills" ON public.skills;
CREATE POLICY "Admin full access on skills"
  ON public.skills FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Table: ai_tools
DROP POLICY IF EXISTS "Admin full access on ai_tools" ON public.ai_tools;
CREATE POLICY "Admin full access on ai_tools"
  ON public.ai_tools FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Table: experiences
DROP POLICY IF EXISTS "Admin full access on experiences" ON public.experiences;
CREATE POLICY "Admin full access on experiences"
  ON public.experiences FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Table: hero_content
DROP POLICY IF EXISTS "Admin full access on hero_content" ON public.hero_content;
CREATE POLICY "Admin full access on hero_content"
  ON public.hero_content FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Table: about_content
DROP POLICY IF EXISTS "Admin full access on about_content" ON public.about_content;
CREATE POLICY "Admin full access on about_content"
  ON public.about_content FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Table: site_settings
DROP POLICY IF EXISTS "Admin full access on site_settings" ON public.site_settings;
CREATE POLICY "Admin full access on site_settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Table: media_assets
DROP POLICY IF EXISTS "Admin full access on media_assets" ON public.media_assets;
CREATE POLICY "Admin full access on media_assets"
  ON public.media_assets FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 3. Harden Storage Policies (portfolio-media)
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS "Admin media upload" ON storage.objects;
CREATE POLICY "Admin media upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-media' 
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin media update" ON storage.objects;
CREATE POLICY "Admin media update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'portfolio-media' 
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'portfolio-media' 
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin media delete" ON storage.objects;
CREATE POLICY "Admin media delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'portfolio-media' 
    AND public.is_admin()
  );
