/* eslint-disable @typescript-eslint/no-require-imports */
const { executeSql } = require('./supabase-mcp-client');

async function inspect() {
  console.log('=== 1. Public Tables Inspection ===');
  const tables = await executeSql(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);
  console.log('Tables in public schema:', tables);

  console.log('\n=== 2. Row Level Security (RLS) Status on Tables ===');
  const rlsStatus = await executeSql(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename;
  `);
  console.log('RLS Status:', rlsStatus);

  console.log('\n=== 3. Current Active RLS Policies on Public Tables ===');
  const policies = await executeSql(`
    SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
  `);
  console.log('Active Policies:', JSON.stringify(policies, null, 2));

  console.log('\n=== 4. Storage Buckets Inspection ===');
  const buckets = await executeSql(`
    SELECT id, name, public, created_at, updated_at 
    FROM storage.buckets;
  `);
  console.log('Storage Buckets:', buckets);

  console.log('\n=== 5. Storage Policies on storage.objects ===');
  const storagePolicies = await executeSql(`
    SELECT policyname, permissive, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects'
    ORDER BY policyname;
  `);
  console.log('Storage Policies:', JSON.stringify(storagePolicies, null, 2));

  console.log('\n=== 6. Auth Users Inspection (Count & Email Confirmation) ===');
  const users = await executeSql(`
    SELECT id, email, confirmed_at, email_confirmed_at, last_sign_in_at, role, raw_app_meta_data 
    FROM auth.users;
  `);
  console.log('Auth Users (safe summary):', users.map(u => ({
    email: u.email,
    confirmed: Boolean(u.confirmed_at || u.email_confirmed_at),
    role: u.role,
    app_meta: u.raw_app_meta_data
  })));
}

inspect().catch(console.error);
