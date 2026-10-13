/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const { executeSql } = require('./supabase-mcp-client');

async function applyHardeningMigration() {
  console.log('Reading migration file supabase/migrations/20261012_harden_admin_rls.sql...');
  const sql = fs.readFileSync('supabase/migrations/20261012_harden_admin_rls.sql', 'utf8');

  console.log('Executing migration on Supabase database...');
  await executeSql(sql);
  console.log('Migration executed successfully!');

  console.log('\nVerifying updated policies in pg_policies:');
  const policies = await executeSql(`
    SELECT tablename, policyname, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE schemaname = 'public' AND policyname LIKE 'Admin%'
    ORDER BY tablename;
  `);
  console.log('Updated CMS Admin Policies:', JSON.stringify(policies, null, 2));

  console.log('\nVerifying storage policies in pg_policies:');
  const storagePolicies = await executeSql(`
    SELECT policyname, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname LIKE 'Admin%'
    ORDER BY policyname;
  `);
  console.log('Updated Storage Admin Policies:', JSON.stringify(storagePolicies, null, 2));

  console.log('\nVerifying public.is_admin() function:');
  const func = await executeSql(`
    SELECT proname, prosecdef, provolatile 
    FROM pg_proc 
    WHERE proname = 'is_admin';
  `);
  console.log('is_admin() Function Definition:', func);
}

applyHardeningMigration().catch(console.error);
