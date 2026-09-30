#!/usr/bin/env node
/**
 * Fetch live campaign stats from Crowd Supply for all campaigns and write
 * src/config/crowd-supply.generated.json keyed by product slug.
 * Local builds retain previous data on failure; --strict fails the deployment workflow.
 */
import { parseStats } from './crowd-supply-stats.mjs';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const GENERATED_PATH = join(REPO_ROOT, 'src/config/crowd-supply.generated.json');

const CAMPAIGNS = [
  { slug: 'keymod', url: 'https://www.crowdsupply.com/techxartisan/openterface-keymod' },
  { slug: 'kvm-go', url: 'https://www.crowdsupply.com/techxartisan/openterface-kvm-go' },
  { slug: 'minikvm', url: 'https://www.crowdsupply.com/techxartisan/openterface-mini-kvm' },
];

const USER_AGENT = 'openterface-marketing-build';

/** Fetch the campaign page and return raw HTML. */
async function fetchCampaignHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.text();
}

function loadExisting() {
  if (existsSync(GENERATED_PATH)) {
    return JSON.parse(readFileSync(GENERATED_PATH, 'utf8'));
  }
  return {};
}

async function main() {
  const existing = loadExisting();
  const updated = Object.fromEntries(CAMPAIGNS.filter(c => existing[c.slug]).map(c => [c.slug, existing[c.slug]]));
  let failures = 0;
  const now = new Date().toISOString();

  for (const campaign of CAMPAIGNS) {
    try {
      const html = await fetchCampaignHtml(campaign.url);
      const fresh = parseStats(html);

      const prev = updated[campaign.slug] || {};
      const changes = [];
      for (const key of ['raised', 'goal', 'percentFunded', 'backers', 'daysLeft', 'updates']) {
        if (fresh[key] !== undefined && fresh[key] !== prev[key]) {
          changes.push(`${key}: ${prev[key]} → ${fresh[key]}`);
        }
      }

      if (JSON.stringify(fresh.timeLeft) !== JSON.stringify(prev.timeLeft)) {
        changes.push(`countdown: ${JSON.stringify(prev.timeLeft)} → ${JSON.stringify(fresh.timeLeft)}`);
      }
      updated[campaign.slug] = { ...fresh, fetchedAt: now };

      if (changes.length > 0) {
        console.log(`sync-crowd-supply [${campaign.slug}]: updated — ${changes.join(', ')}`);
      } else {
        console.log(`sync-crowd-supply [${campaign.slug}]: no changes`);
      }
    } catch (err) {
      failures++;
      console.error(`::warning::sync-crowd-supply [${campaign.slug}]: ${err.message}; retaining previous data`);
    }
  }

  writeFileSync(GENERATED_PATH, `${JSON.stringify(updated, null, 2)}\n`);
  console.log(`sync-crowd-supply: wrote ${GENERATED_PATH}`);
  if (failures && process.argv.includes('--strict')) process.exitCode = 1;
}

if (process.env.SKIP_CROWD_SUPPLY_SYNC !== '1') main().catch((err) => {
  console.error(err);
  process.exit(1);
});
