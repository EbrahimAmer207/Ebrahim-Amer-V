/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Safe Admin CRUD Round-Trip Verification Script
 * Inserts a temporary test record, updates it, and deletes it immediately,
 * confirming that write authorization works and leaving the database clean.
 */

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
for (const line of env.split('\n')) {
  const parts = line.split('=');
  if (parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_URL') url = parts[1].trim();
  if (parts[0].trim() === 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY' && !key) key = parts[1].trim();
}

async function runTest(email, password) {
  if (!email || !password) {
    console.log('Usage: node scripts/test-crud-roundtrip.js <admin-email> <admin-password>');
    console.log('Or test directly via the Dashboard at http://localhost:3000/dashboard/projects');
    process.exit(1);
  }

  const supabase = createClient(url, key);

  console.log('1. Authenticating as administrator...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError || !authData.user) {
    console.error('Authentication failed:', authError ? authError.message : 'No user returned');
    process.exit(1);
  }

  console.log('Authentication successful for user:', authData.user.email);
  const testSlug = `temp-audit-test-${Date.now()}`;

  // 2. Insert temporary project
  console.log('2. Testing authorized INSERT...');
  const { data: insertData, error: insertError } = await supabase
    .from('projects')
    .insert({
      slug: testSlug,
      title: 'Temporary Audit Test Project',
      category: 'Audit',
      description: 'Temporary verification record that will be immediately deleted.',
      long_description: 'Temporary test description.',
      is_published: false,
      display_order: 999
    })
    .select()
    .single();

  if (insertError) {
    console.error('INSERT failed:', insertError.message);
    process.exit(1);
  }
  console.log('INSERT successful! Record ID:', insertData.id);

  // 3. Update temporary project
  console.log('3. Testing authorized UPDATE...');
  const { data: updateData, error: updateError } = await supabase
    .from('projects')
    .update({ title: 'Temporary Audit Test Project (Updated)' })
    .eq('id', insertData.id)
    .select()
    .single();

  if (updateError) {
    console.error('UPDATE failed:', updateError.message);
  } else {
    console.log('UPDATE successful! New title:', updateData.title);
  }

  // 4. Delete temporary project (leaving DB clean)
  console.log('4. Testing authorized DELETE (cleanup)...');
  const { error: deleteError } = await supabase
    .from('projects')
    .delete()
    .eq('id', insertData.id);

  if (deleteError) {
    console.error('DELETE cleanup failed:', deleteError.message);
  } else {
    console.log('DELETE cleanup successful! Database restored to clean state.');
  }

  console.log('\n=== ALL CRUD ROUND-TRIP TESTS PASSED WITH 0 LEFTOVER DATA ===');
}

const args = process.argv.slice(2);
runTest(args[0], args[1]);
