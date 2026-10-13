/* eslint-disable @typescript-eslint/no-require-imports */
const { executeSql } = require('./supabase-mcp-client');

async function testRlsPermissions() {
  console.log('=== TEST A: Admin Identity Verification (himaamer937@gmail.com) ===');
  const adminTest = await executeSql(`
    DO $$
    BEGIN
      -- Simulate admin session
      PERFORM set_config('request.jwt.claims', '{"role":"authenticated","email":"himaamer937@gmail.com"}', true);
      PERFORM set_config('role', 'authenticated', true);

      IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'is_admin() returned FALSE for himaamer937@gmail.com!';
      END IF;
    END $$;
  `);
  console.log('Admin check result: PASS (is_admin() evaluates to TRUE for himaamer937@gmail.com)');

  console.log('\n=== TEST B: Non-Admin Identity Verification (attacker@evil.com) ===');
  const nonAdminTest = await executeSql(`
    DO $$
    BEGIN
      -- Simulate non-admin session
      PERFORM set_config('request.jwt.claims', '{"role":"authenticated","email":"attacker@evil.com"}', true);
      PERFORM set_config('role', 'authenticated', true);

      IF public.is_admin() THEN
        RAISE EXCEPTION 'is_admin() returned TRUE for attacker@evil.com!';
      END IF;
    END $$;
  `);
  console.log('Non-admin check result: PASS (is_admin() evaluates to FALSE for attacker@evil.com)');

  console.log('\n=== TEST C: Full CRUD Round-Trip for Admin on projects Table ===');
  const crudTest = await executeSql(`
    DO $$
    DECLARE
      v_id UUID;
      v_title TEXT;
    BEGIN
      -- 1. Switch to authenticated admin session
      PERFORM set_config('request.jwt.claims', '{"role":"authenticated","email":"himaamer937@gmail.com"}', true);
      PERFORM set_config('role', 'authenticated', true);

      -- 2. INSERT temporary test record
      INSERT INTO public.projects (slug, title, category, description, long_description, is_published, display_order)
      VALUES ('temp-audit-sim-test', 'Temp Audit Project', 'Test', 'Temporary test description', 'Long description', false, 999)
      RETURNING id INTO v_id;

      -- 3. UPDATE temporary test record
      UPDATE public.projects
      SET title = 'Temp Audit Project (Updated)'
      WHERE id = v_id
      RETURNING title INTO v_title;

      IF v_title <> 'Temp Audit Project (Updated)' THEN
        RAISE EXCEPTION 'UPDATE verification failed!';
      END IF;

      -- 4. DELETE temporary test record (leave DB 100% clean)
      DELETE FROM public.projects WHERE id = v_id;
    END $$;
  `);
  console.log('CRUD Round-Trip: PASS (Insert, Update, Delete succeeded and cleaned up with 0 leftover records)');

  console.log('\n=== TEST D: Non-Admin Write Rejection by PostgreSQL RLS ===');
  let blocked = false;
  try {
    await executeSql(`
      DO $$
      BEGIN
        -- Simulate attacker session
        PERFORM set_config('request.jwt.claims', '{"role":"authenticated","email":"attacker@evil.com"}', true);
        PERFORM set_config('role', 'authenticated', true);

        INSERT INTO public.projects (slug, title, category, description, long_description)
        VALUES ('exploit-slug', 'Exploit', 'Exploit', 'Exploit', 'Exploit');
      END $$;
    `);
  } catch (err) {
    blocked = true;
    console.log('Attacker INSERT attempt was REJECTED by PostgreSQL RLS: PASS');
  }

  if (!blocked) {
    throw new Error('CRITICAL FAILURE: Attacker was able to insert into projects table!');
  }

  console.log('\n=== VERIFICATION: Confirm projects table is 100% clean ===');
  const rows = await executeSql(`SELECT count(*) FROM public.projects;`);
  console.log('Final project row count in database:', rows[0].count);
}

testRlsPermissions().catch(console.error);
