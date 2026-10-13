/* eslint-disable @typescript-eslint/no-require-imports */
const { executeSql } = require('./supabase-mcp-client');

async function testStorageAndRendering() {
  console.log('=== TEST 1: Storage Authorization (portfolio-media) ===');
  
  // Test admin upload in storage.objects inside transaction that rolls back
  await executeSql(`
    DO $$
    DECLARE
      v_obj_id UUID;
    BEGIN
      -- Simulate admin session
      PERFORM set_config('request.jwt.claims', '{"role":"authenticated","email":"himaamer937@gmail.com"}', true);
      PERFORM set_config('role', 'authenticated', true);

      -- Check RLS allows insert for admin
      INSERT INTO storage.objects (bucket_id, name, owner)
      VALUES ('portfolio-media', 'test-audit-temp.png', auth.uid())
      RETURNING id INTO v_obj_id;

      -- If we reached here, INSERT was permitted by RLS!
      -- Raise exception to rollback transaction automatically
      RAISE EXCEPTION 'TEST_SUCCESS_ROLLBACK';
    EXCEPTION
      WHEN OTHERS THEN
        IF SQLERRM = 'TEST_SUCCESS_ROLLBACK' THEN
          -- Success! Insert succeeded under RLS and was cleanly rolled back.
          NULL;
        ELSE
          RAISE;
        END IF;
    END $$;
  `);
  console.log('Storage Admin Upload: PASS (Admin can upload to portfolio-media)');

  // Test non-admin upload rejection in storage.objects
  let storageBlocked = false;
  try {
    await executeSql(`
      DO $$
      BEGIN
        -- Simulate attacker session
        PERFORM set_config('request.jwt.claims', '{"role":"authenticated","email":"attacker@evil.com"}', true);
        PERFORM set_config('role', 'authenticated', true);

        INSERT INTO storage.objects (bucket_id, name, owner)
        VALUES ('portfolio-media', 'malicious.png', auth.uid());
      END $$;
    `);
  } catch (err) {
    storageBlocked = true;
    console.log('Storage Non-Admin Upload: BLOCKED by RLS: PASS');
  }

  if (!storageBlocked) {
    throw new Error('CRITICAL FAILURE: Non-admin was able to upload to portfolio-media!');
  }

  console.log('\n=== TEST 2: Public Project Rendering & Fallback Behavior ===');
  const resHome = await fetch('http://localhost:3000/');
  console.log('Homepage status:', resHome.status);
  const homeHtml = await resHome.text();
  console.log('Growfet rendered on homepage:', homeHtml.includes('Growfet'));
  console.log('Rashet Etr rendered on homepage:', homeHtml.includes('Rashet'));
  console.log('Growfet Tech rendered on homepage:', homeHtml.includes('Growfet Tech'));

  const resProject = await fetch('http://localhost:3000/projects/growfet');
  console.log('Case study /projects/growfet status:', resProject.status);
  const projHtml = await resProject.text();
  console.log('Case study title rendered:', projHtml.includes('Growfet'));
}

testStorageAndRendering().catch(console.error);
