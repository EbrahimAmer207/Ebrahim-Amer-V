/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

function getMcpToken() {
  const oauthPath = 'C:/Users/pc/.gemini/antigravity-ide/mcp_oauth_tokens.json';
  if (!fs.existsSync(oauthPath)) {
    throw new Error('OAuth tokens file not found');
  }
  const data = JSON.parse(fs.readFileSync(oauthPath, 'utf8'));
  const entry = data['https://mcp.supabase.com/mcp'];
  if (!entry || !entry.token || !entry.token.access_token) {
    throw new Error('No access token found for Supabase MCP');
  }
  return entry.token.access_token;
}

const PROJECT_ID = 'argaewhbcqwsqdaaynmw';

async function executeSql(query) {
  const token = getMcpToken();
  const url = `https://api.supabase.com/v1/projects/${PROJECT_ID}/database/query`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`SQL execution failed (${res.status}): ${errorText}`);
  }

  return await res.json();
}

async function getProjectDetails() {
  const token = getMcpToken();
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_ID}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}

module.exports = {
  PROJECT_ID,
  executeSql,
  getProjectDetails
};
